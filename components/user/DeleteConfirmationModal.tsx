import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DeleteConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  title = "هل أنت متأكد من حذف الطلب؟",
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            padding: 20,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#FF3B30",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onConfirm}
            >
              <Text
                style={{ fontWeight: "600", fontSize: 14, color: "white" }}
              >
                حذف
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E4E4E4",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onCancel}
            >
              <Text
                style={{ fontWeight: "600", fontSize: 14, color: "#11171A" }}
              >
                إلغاء
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;