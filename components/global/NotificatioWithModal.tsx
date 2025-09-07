import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import NotificationIcon from '@/assets/icons/user/NotificationIcon';
import NotificationComponent from './NotificationComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const NotificationIconWithModal: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const { unreadCount } = useSelector((state: RootState) => state.notifications);

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.iconContainer}>
                    <NotificationIcon />
                    {unreadCount > 0 && (
                        <View style={styles.badge}>
                            <ThemedText style={styles.badgeText}>{unreadCount}</ThemedText>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
            <NotificationComponent
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 600,
    },
});

export default NotificationIconWithModal;