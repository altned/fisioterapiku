import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Clipboard,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import { paymentService } from '../services/paymentService';

type RouteParams = {
  PaymentUpload: {
    bookingId: string;
  };
};

type PaymentMethod = 'BANK_TRANSFER' | 'QRIS';

const PaymentUploadScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'PaymentUpload'>>();
  const { bookingId } = route.params;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const bankDetails = {
    bankName: 'Bank Mandiri',
    accountNumber: '1234567890',
    accountName: 'PT Fisioku Indonesia',
  };

  const handleSelectImage = () => {
    Alert.alert(
      'Select Payment Proof',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: handleTakePhoto,
        },
        {
          text: 'Choose from Gallery',
          onPress: handleChooseFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleTakePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        saveToPhotos: true,
      });

      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0]);
      }
    } catch {
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
      });

      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0]);
      }
    } catch {
      Alert.alert('Error', 'Failed to open gallery');
    }
  };

  const handleCopyAccountNumber = () => {
    Clipboard.setString(bankDetails.accountNumber);
    Alert.alert('Copied', 'Account number copied to clipboard');
  };

  const handleSubmit = async () => {
    if (!selectedImage || !selectedImage.uri) {
      Alert.alert('Error', 'Please select a payment proof image');
      return;
    }

    setIsUploading(true);
    try {
      // In production, you would upload to cloud storage first
      // For now, we'll send the local URI (backend should handle file upload)
      const response = await paymentService.uploadPaymentProof(
        bookingId,
        paymentMethod,
        selectedImage.uri
      );

      if (response.success) {
        Alert.alert(
          'Success',
          'Payment proof uploaded successfully. Please wait for admin verification.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to upload payment proof');
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Icon name="information" size={24} color={COLORS.info} />
          <Text style={styles.infoText}>
            Please complete the payment first, then upload your payment proof here for verification.
          </Text>
        </View>

        {/* Payment Method Selection */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.methodContainer}>
            <TouchableOpacity
              style={[
                styles.methodCard,
                paymentMethod === 'BANK_TRANSFER' && styles.methodCardSelected,
              ]}
              onPress={() => setPaymentMethod('BANK_TRANSFER')}>
              <Icon
                name="bank"
                size={32}
                color={paymentMethod === 'BANK_TRANSFER' ? COLORS.primary : COLORS.textLight}
              />
              <Text
                style={[
                  styles.methodText,
                  paymentMethod === 'BANK_TRANSFER' && styles.methodTextSelected,
                ]}>
                Bank Transfer
              </Text>
              {paymentMethod === 'BANK_TRANSFER' && (
                <View style={styles.checkIcon}>
                  <Icon name="check-circle" size={24} color={COLORS.primary} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodCard,
                paymentMethod === 'QRIS' && styles.methodCardSelected,
              ]}
              onPress={() => setPaymentMethod('QRIS')}>
              <Icon
                name="qrcode"
                size={32}
                color={paymentMethod === 'QRIS' ? COLORS.primary : COLORS.textLight}
              />
              <Text
                style={[
                  styles.methodText,
                  paymentMethod === 'QRIS' && styles.methodTextSelected,
                ]}>
                QRIS
              </Text>
              {paymentMethod === 'QRIS' && (
                <View style={styles.checkIcon}>
                  <Icon name="check-circle" size={24} color={COLORS.primary} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Details */}
        {paymentMethod === 'BANK_TRANSFER' ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Bank Account Details</Text>
            
            <View style={styles.bankDetailRow}>
              <Text style={styles.bankLabel}>Bank Name</Text>
              <Text style={styles.bankValue}>{bankDetails.bankName}</Text>
            </View>

            <View style={styles.bankDetailRow}>
              <Text style={styles.bankLabel}>Account Number</Text>
              <View style={styles.accountNumberContainer}>
                <Text style={styles.bankValue}>{bankDetails.accountNumber}</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={handleCopyAccountNumber}>
                  <Icon name="content-copy" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bankDetailRow}>
              <Text style={styles.bankLabel}>Account Name</Text>
              <Text style={styles.bankValue}>{bankDetails.accountName}</Text>
            </View>

            <View style={styles.instructionBox}>
              <Icon name="lightbulb-outline" size={20} color={COLORS.warning} />
              <Text style={styles.instructionText}>
                Please make sure to transfer to the correct account number above
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>QRIS Code</Text>
            <View style={styles.qrisContainer}>
              <View style={styles.qrisPlaceholder}>
                <Icon name="qrcode-scan" size={120} color={COLORS.textLight} />
                <Text style={styles.qrisText}>Scan this QR code</Text>
                <Text style={styles.qrisSubtext}>with your banking app</Text>
              </View>
            </View>
          </View>
        )}

        {/* Upload Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upload Payment Proof</Text>
          
          {selectedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={handleSelectImage}>
                <Icon name="image-edit" size={20} color={COLORS.white} />
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadPlaceholder}
              onPress={handleSelectImage}>
              <Icon name="camera-plus" size={48} color={COLORS.textLight} />
              <Text style={styles.uploadText}>Tap to upload payment proof</Text>
              <Text style={styles.uploadSubtext}>Camera or Gallery</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedImage || isUploading) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!selectedImage || isUploading}>
            {isUploading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <Icon name="upload" size={20} color={COLORS.white} />
                <Text style={styles.submitButtonText}>Submit Payment Proof</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: SPACING.md,
    margin: SPACING.md,
    borderRadius: SIZES.radius,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.info,
    marginLeft: SPACING.sm,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    margin: SPACING.md,
    marginTop: 0,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  methodContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  methodCard: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  methodCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#E8F5E9',
  },
  methodText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  methodTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  bankDetailRow: {
    marginBottom: SPACING.md,
  },
  bankLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  bankValue: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  accountNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyButton: {
    padding: SPACING.xs,
  },
  instructionBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    padding: SPACING.sm,
    borderRadius: SIZES.radius,
    marginTop: SPACING.sm,
    alignItems: 'flex-start',
  },
  instructionText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.warning,
    marginLeft: SPACING.xs,
    lineHeight: 18,
  },
  qrisContainer: {
    alignItems: 'center',
  },
  qrisPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  qrisText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontWeight: '600',
  },
  qrisSubtext: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginTop: 4,
  },
  uploadPlaceholder: {
    borderWidth: 2,
    borderColor: COLORS.textLight,
    borderStyle: 'dashed',
    borderRadius: SIZES.radius,
    padding: SPACING.xl,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
  },
  uploadText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontWeight: '600',
  },
  uploadSubtext: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginTop: 4,
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: SIZES.radius,
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius,
    marginTop: SPACING.md,
  },
  changeImageText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  buttonContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.textLight,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
});

export default PaymentUploadScreen;
