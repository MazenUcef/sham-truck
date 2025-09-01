import ThemedText from '@/components/ui/ThemedText';
import { addNotification, deleteNotification, fetchNotifications, fetchUnreadCount, markAllAsRead, markAsRead } from '@/redux/slices/NotificationSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useSocket } from '@/sockets/SocketContext';
import { Notification } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window');

interface NotificationComponentProps {
  isVisible: boolean;
  onClose: () => void;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ isVisible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount, status, error } = useSelector((state: RootState) => state.notifications);
  const { socket } = useSocket();
  const translateY = useSharedValue(height);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchNotifications({ page: 1, limit: 20 }));
    await dispatch(fetchUnreadCount());
    setRefreshing(false);
  }, [dispatch]);

useEffect(() => {
  if (isVisible) {
    const loadData = async () => {
      try {
        await dispatch(fetchNotifications({ page: 1, limit: 20 }));
        await dispatch(fetchUnreadCount());
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };
    
    loadData();
  }
}, [dispatch, isVisible]);

  useEffect(() => {
    if (socket) {
      socket.on('new-notification', (notification: Notification) => {
        dispatch(addNotification(notification));
      });

      return () => {
        socket.off('new-notification');
      };
    }
  }, [socket, dispatch]);

  useEffect(() => {
    translateY.value = withTiming(isVisible ? 0 : height, { duration: 300 });
  }, [isVisible, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDeleteNotification = (id: string) => {
    dispatch(deleteNotification(id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_offer':
        return { name: 'cash-outline', color: '#4CAF50' };
      case 'offer_accepted':
        return { name: 'checkmark-circle-outline', color: '#4CAF50' };
      case 'offer_rejected':
        return { name: 'close-circle-outline', color: '#F44336' };
      case 'order_created':
        return { name: 'document-text-outline', color: '#2196F3' };
      case 'order_updated':
        return { name: 'refresh-circle-outline', color: '#FF9800' };
      case 'order_completed':
        return { name: 'checkmark-done-circle-outline', color: '#4CAF50' };
      case 'ring':
        return { name: 'notifications-outline', color: '#9C27B0' };
      default:
        return { name: 'notifications-outline', color: '#666' };
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'الآن';
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      return new Date(date).toLocaleDateString('ar-SA');
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => {
    const icon = getNotificationIcon(item.type);

    return (
      <View style={[styles.notificationItem, !item.is_read && styles.unreadItem]}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon.name as any} size={24} color={icon.color} />
          {!item.is_read && <View style={styles.unreadDot} />}
        </View>

        <View style={styles.notificationContent}>
          <ThemedText style={[styles.notificationTitle, !item.is_read && styles.unreadText]}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.notificationText} numberOfLines={2}>
            {item.message}
          </ThemedText>

          <View style={styles.notificationMeta}>
            <ThemedText style={styles.notificationTime}>
              {formatTime(item.createdAt)}
            </ThemedText>

            <View style={styles.actionButtons}>
              {!item.is_read && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.readButton]}
                  onPress={() => handleMarkAsRead(item._id)}
                >
                  <Ionicons name="checkmark" size={16} color="#4CAF50" />
                  <ThemedText style={styles.readButtonText}>تعليم كمقروء</ThemedText>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteNotification(item._id)}
              >
                <Ionicons name="trash-outline" size={16} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}
        />

        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <ThemedText style={styles.headerText}>الإشعارات</ThemedText>
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>{unreadCount}</ThemedText>
                </View>
              )}
            </View>

            <View style={styles.headerActions}>
              {unreadCount > 0 && (
                <TouchableOpacity
                  style={styles.markAllButton}
                  onPress={handleMarkAllAsRead}
                >
                  <Ionicons name="checkmark-done" size={20} color="#F9844A" />
                  <ThemedText style={styles.markAllText}>تعليم الكل</ThemedText>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={onClose} style={styles.closeHeaderButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>
            {status === 'loading' && !refreshing ? (
              <View style={styles.centerContent}>
                <Ionicons name="notifications" size={48} color="#E4E4E4" />
                <ThemedText style={styles.statusText}>جاري تحميل الإشعارات...</ThemedText>
              </View>
            ) : error ? (
              <View style={styles.centerContent}>
                <Ionicons name="alert-circle" size={48} color="#F44336" />
                <ThemedText style={styles.errorText}>{error}</ThemedText>
              </View>
            ) : notifications?.length === 0 ? (
              <View style={styles.centerContent}>
                <Ionicons name="notifications-off" size={48} color="#E4E4E4" />
                <ThemedText style={styles.emptyText}>لا توجد إشعارات حتى الآن</ThemedText>
                <ThemedText style={styles.emptySubtext}>سنخطرك عندما تصل أي إشعارات جديدة</ThemedText>
              </View>
            ) : (
              <FlatList
                data={notifications}
                keyExtractor={(item) => {
                  if (item._id) return item._id;
                  return Math.random().toString();
                }}
                renderItem={renderNotification}
                style={styles.notificationList}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#F9844A']}
                    tintColor={'#F9844A'}
                  />
                }
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  badge: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  markAllText: {
    fontSize: 14,
    color: '#F9844A',
    fontWeight: '600',
  },
  closeHeaderButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 12,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: 'white',
    gap: 12,
  },
  unreadItem: {
    backgroundColor: '#F8F9FF',
  },
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4FF',
  },
  unreadDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  unreadText: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
  notificationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  notificationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
    gap: 4,
  },
  readButton: {
    backgroundColor: '#E8F5E8',
  },
  readButtonText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
});

export default NotificationComponent;