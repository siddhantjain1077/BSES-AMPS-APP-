import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import { useTheme } from '../screens/ThemeContext';
import getStyles from '../screens/DetailScreen.styling';

export const RejectReasonModal = ({ visible, onClose, onSubmit }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);
  const [selectedReason, setSelectedReason] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit({ selectedReason, comment });
    setSelectedReason(null);
    setComment('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Reasons for Rejection</Text>
          {['TF Deficiency', 'CF Deficiency', 'TF + CF Deficiency'].map((reason) => (
            <TouchableOpacity key={reason} onPress={() => setSelectedReason(reason)} style={styles.radioButtonContainer}>
              <View style={styles.radioButton}>
                {selectedReason === reason && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.radioLabel}>{reason}</Text>
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            multiline
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalBackButton} onPress={onClose}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={handleSubmit}
              disabled={!selectedReason}
            >
              <Text style={[styles.buttonText, !selectedReason && { opacity: 0.5 }]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ApproveCommentModal = ({ visible, onClose, onSubmit }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit(comment);
    setComment('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Enter Your Comment</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            multiline
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalBackButton} onPress={onClose}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={handleSubmit}
              disabled={!comment.trim()}
            >
              <Text style={[styles.buttonText, !comment.trim() && { opacity: 0.5 }]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const TFrevisitModal = ({ visible, onClose, onSubmit }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Enter TF Revisit Comment</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            multiline
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalBackButton} onPress={onClose}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={handleSubmit}
              disabled={!comment.trim()}
            >
              <Text style={[styles.buttonText, !comment.trim() && { opacity: 0.5 }]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
