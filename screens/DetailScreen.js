import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import getStyles from '../screens/DetailScreen.styling';
import { useTheme } from '../screens/ThemeContext';
import bijliLight from '../assets/Bijli_kendra_white.png';
import bijliDark from '../assets/BijliSevaKendra_withoutBG.png';
import { VIEW_PENDING_URL } from '../Services/api';
import { TF_ENG_LIST_URL, postRequest } from '../Services/api';
import { DROPDOWN_LIST_URL } from '../Services/api';
import { Picker } from '@react-native-picker/picker';
import { TF_REVISIT_SUBMIT_URL } from '../Services/api';


const CollapsibleCard = ({ title, children, initialExpanded = false }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);
  const [expanded, setExpanded] = useState(initialExpanded);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.collapsibleHeader}>
        <Text style={[styles.collapsibleTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.toggleIcon, { color: colors.text }]}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};

const KeyValue = ({ label, value }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text }]}>{value || '-'}</Text>
    </View>
  );
};
const RejectReasonModal = ({ visible, onClose, onSubmit }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [comment, setComment] = useState('');

useEffect(() => {
  const fetchDeficiencyList = async () => {
    try {
      const response = await postRequest(DROPDOWN_LIST_URL, {}); 

      console.log('[✅ Raw Deficiency List API Response]', response);

      if (Array.isArray(response?.data)) {
        console.log('[📋 Parsed Items]', response.data); // <-- LOG HERE
        setDropdownItems(response.data); 
      } else {
        console.warn('[⚠️ Unexpected Response Format]', response);
      }
    } catch (error) {
      console.error('[❌ Deficiency Fetch Error]', error);
    }
  };

  if (visible) {
    fetchDeficiencyList();
  }
}, [visible]);



  const handleSubmit = () => {
    onSubmit({
      selectedReason,
      code: selectedItem,
      comment,
    });

    setSelectedReason(null);
    setSelectedItem(null);
    setComment('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Reasons for Rejection</Text>

          {['TF Deficiency', 'CF Deficiency', 'TF + CF Deficiency'].map((reason) => (
            <TouchableOpacity
              key={reason}
              onPress={() => setSelectedReason(reason)}
              style={styles.radioButtonContainer}
            >
              <View style={styles.radioButton}>
                {selectedReason === reason && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.radioLabel}>{reason}</Text>
            </TouchableOpacity>
          ))}

          <Text style={{ marginTop: 10, fontWeight: '600', color: colors.text }}>
            Total Selected Reasons = {selectedItem ? 1 : 0}
          </Text>

          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedItem}
              onValueChange={(itemValue) => setSelectedItem(itemValue)}
              style={styles.pickerStyle}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label="Select item" value={null} />
              {dropdownItems.map((item, index) => (
                <Picker.Item 
                key={index} 
                label={item.codeText} 
                value={item.code} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            placeholderTextColor={colors.textSecondary || '#888'}
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
              disabled={!selectedReason || !selectedItem}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ApproveCommentModal = ({ visible, onClose, onSubmit }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
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
          <TextInput style={styles.commentInput} placeholder="Write a comment..." multiline value={comment} onChangeText={setComment} textAlignVertical="top" />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalBackButton} onPress={onClose}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSubmit} disabled={!comment.trim()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const TFrevisitModal = ({ visible, onClose, onSubmit, userId, division }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [comment, setComment] = useState('');
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEngineers = async () => {
      if (!visible) return;
      setLoading(true);

      try {
        const payload = { userId, division };
        const response = await postRequest(TF_ENG_LIST_URL, payload);

        // ✅ Log after receiving the response
        console.log('[👷 TF Engineers API Response]', response);

        if (Array.isArray(response?.data)) {
          console.log('[✅ TF Engineers]', response.data);
          setEngineers(response.data);
        } else {
          console.warn('[❌ Unexpected TF Engineer Response]', response);
          Alert.alert('Error', 'No TF engineers found.');
        }
      } catch (err) {
        console.error('[❌ TF Engineer Fetch Error]', err);
        Alert.alert('Error', 'Failed to load TF engineer list.');
      } finally {
        setLoading(false);
      }
    };

    fetchEngineers();
  }, [visible]);


  const handleSubmit = () => {
    if (selectedEngineer && comment.trim()) {
      onSubmit({ engineer: selectedEngineer, comment });
      setComment('');
      setSelectedEngineer(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>TF Revisit</Text>
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Select TF Engineer</Text>

          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <ScrollView style={styles.modalScroll}>
              {engineers.map((eng, idx) => {
                const isSelected = selectedEngineer?.engineerId === eng.engineerId;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedEngineer(eng)}
                    style={[
                      styles.engineerCard,
                      selectedEngineer?.tfUserId === eng.tfUserId && styles.selectedEngineerCard
                    ]}
                  >
                    <Text style={styles.engineerText}>Name: {eng.tfName}</Text>
                    <Text style={styles.engineerText}>ID: {eng.tfUserId}</Text>
                    <Text style={styles.engineerText}>Division: {eng.tfDivision}</Text>
                    <Text style={styles.engineerText}>Pending Cases: {eng.pendingCases || 0}</Text>

                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Enter Your Comments</Text>
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
              disabled={!selectedEngineer || !comment.trim()}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const DetailScreen = () => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const [isApproveModalVisible, setApproveModalVisible] = useState(false);
  const [isTFRevisitVisible, setTFRevisitVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const route = useRoute();
  const { orderDetails } = route.params || {};

  const handleTFRevisitSubmit = async ({ engineer, comment }) => {
    try {
      const payload = {
        engineerId: engineer.tfUserId,
        orderNo: orderDetails.orderNo,
        division: 'S2RKP',
        zdin: orderDetails.zdin,
        comment: comment,
        // userId: 'dsktfauTo', 
      };

      console.log('[📤 Submitting TF Revisit]', payload);

      const response = await postRequest(TF_REVISIT_SUBMIT_URL, payload);

      if (response?.success) {
        Alert.alert('Success', 'TF Revisit request submitted successfully.');
      } else {
        Alert.alert('Failed', response?.message || 'Submission failed.');
      }
    } catch (error) {
      console.error('[❌ Submit Error]', error);
      Alert.alert('Error', 'Something went wrong while submitting.');
    }
  };

  useEffect(() => {
    console.log('[🧭 route.params]', route.params);
    console.log('[🧾 orderDetails]', orderDetails);

    const fetchDetailData = async () => {
      if (!orderDetails) {
        Alert.alert('Error', 'No order details received.');
        setLoading(false);
        return;
      }

      console.log('[📋 Fetching Order Details]', orderDetails);
      const division = 'S2RKP'; // manually assigned
      const { orderNo, zdin } = orderDetails;
      const payload = { orderNo, division, zdin };


      try {
        const response = await postRequest(VIEW_PENDING_URL, payload);

        if (response.success && response.data) {
          setData(response.data);
        } else {
          console.warn('[❌ API Failed]', response.message || 'No data received');
          Alert.alert('Error', response.message || 'Data fetch failed');
        }
      } catch (error) {
        console.error('[Fetch Error]', error);
        Alert.alert('Error', 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchDetailData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 50 }}>
          No data found for this request.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={isDark ? bijliDark : bijliLight} style={styles.BijliSevaKendraImage} resizeMode="contain" />
      <Text style={styles.sectionTitle}>Order Info:</Text>

      <CollapsibleCard title="Basic Details" initialExpanded>
        <KeyValue label="Order No." value={data.orderNo} />
        <KeyValue label="Name" value={data.name} />
        <KeyValue label="Father's Name" value={data.fatherName} />
        <KeyValue label="Mobile No." value={data.mobileNo} />
        <KeyValue label="Address" value={data.address} />
        <KeyValue label="Order Date" value={data.orderDate} />
        <KeyValue label="Division" value={data.division} />
        <KeyValue label="ZDIN" value={data.zdin} />
      </CollapsibleCard>

      <CollapsibleCard title="Connection Details">
        <KeyValue label="Category" value={data.categoryName} />
        <KeyValue label="Request Type" value={data.requestType} />
        <KeyValue label="Applied Load (KW)" value={data.appliedloadinkw} />
        <KeyValue label="Meter Type" value={data.meterType} />
        <KeyValue label="Connection Phase" value={data.supplytypE_PHASE} />
      </CollapsibleCard>

      <CollapsibleCard title="Infrastructure">
        <KeyValue label="Safe Meter Space" value={data.safemeterspace} />
        <KeyValue label="Wiring Completed" value={data.wirinG_COMPLETED} />
        <KeyValue label="Lift Status" value={data.liftstatus} />
        <KeyValue label="Lift Certificate" value={data.lifT_CERTIFICATE_REQUIRED} />
        <KeyValue label="Cable Type" value={data.cablE_TYPE} />
        <KeyValue label="Cable Size" value={data.cablE_SIZE} />
        <KeyValue label="Service Line Length" value={data.servicE_LINE_LENGTH} />
        <KeyValue label="Meter Panel" value={data.meteR_PANEL} />
        <KeyValue label="Meter Location" value={data.meteR_LOCATION} />
        <KeyValue label="Outside Meter Projection" value={data.outsidE_MTR_PROJECTION} />
      </CollapsibleCard>

      <CollapsibleCard title="Enforcement & Safety">
        <KeyValue label="Enforcement Lead" value={data.enforcementlead} />
        <KeyValue label="Under HT/LT Line" value={data.undeR_HT_LT_LINE} />
        <KeyValue label="Pole Overloaded/Hazardous" value={data.ispolehazardous} />
        <KeyValue label="Private Bus Bar" value={data.privatE_BUS_BAR} />
        <KeyValue label="Representative Available" value={data.representativeavailability} />
        <KeyValue label="Wiring Test Report" value={data.wiringtestreport} />
        <KeyValue label="ELCB Available" value={data.elcB_AVAILABLE} />
        <KeyValue label="MCB Available" value={data.mcB_AVAILABLE} />
      </CollapsibleCard>

      <CollapsibleCard title="TF Details">
        <KeyValue label="TF Area Type" value={data.tfareatype} />
        <KeyValue label="Locality Type" value={data.tflocalitytype} />
        <KeyValue label="Nature of Use" value={data.tfnatureofuse} />
        <KeyValue label="TF Structure of Premises" value={data.tfstructureofpremises} />
      </CollapsibleCard>

      <CollapsibleCard title="Property Details">
        <KeyValue label="Plot Area" value={data.ploT_AREA} />
        <KeyValue label="Covered Area" value={data.covereD_AREA} />
        <KeyValue label="Common Area Parking" value={data.commaN_AREA_PARKING} />
        <KeyValue label="Separate Entry" value={data.separatE_ENTRY} />
        <KeyValue label="Separate Meter Available" value={data.seperatE_MTR_AVAILABLE} />
      </CollapsibleCard>

      <CollapsibleCard title="MMG Information">
        <KeyValue label="MMG DT" value={data.mmgDt} />
        <KeyValue label="MMG Meter Location" value={data.mmgMeterLocation} />
        <KeyValue label="MMG Meter Quality" value={data.mmgMeterQualityStatus} />
      </CollapsibleCard>

      <CollapsibleCard title="CF Details">
        {(data.cfDataList || []).map((cf, idx) => (
          <React.Fragment key={idx}>
            <KeyValue label="CA" value={cf.ca} />
            <KeyValue label="Net OS Amt" value={cf.netOSAmt} />
            <KeyValue label="Name" value={cf.name} />
            <KeyValue label="Address" value={cf.address} />
          </React.Fragment>
        ))}
      </CollapsibleCard>

      <CollapsibleCard title="MCD Details">
        {(data.mcdDataList || []).map((mcd, idx) => (
          <React.Fragment key={idx}>
            <KeyValue label="Unit Name" value={mcd.nameOfUnit} />
            <KeyValue label="Property Address" value={mcd.addressOfProperty} />
          </React.Fragment>
        ))}
      </CollapsibleCard>

      <View style={styles.tfRevisitContainer}>
        <TouchableOpacity style={styles.tfRevisitButtons} onPress={() => setTFRevisitVisible(true)}>
          <Text style={styles.tfRevisitTitle}>TF REVISIT</Text>
        </TouchableOpacity>
        <View style={styles.tfRevisitButtons}>
          <TouchableOpacity style={styles.rejectButton} onPress={() => setRejectModalVisible(true)}>
            <Text style={styles.buttonText}>REJECT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approveButton} onPress={() => setApproveModalVisible(true)}>
            <Text style={styles.buttonText}>APPROVE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <RejectReasonModal visible={isRejectModalVisible} onClose={() => setRejectModalVisible(false)} onSubmit={(data) => console.log('Rejected:', data)} />
      <ApproveCommentModal visible={isApproveModalVisible} onClose={() => setApproveModalVisible(false)} onSubmit={(comment) => console.log('Approved:', comment)} />
      <TFrevisitModal
        visible={isTFRevisitVisible}
        onClose={() => setTFRevisitVisible(false)}
        onSubmit={handleTFRevisitSubmit}
        userId="dsktfauTo"
        division={orderDetails?.division}
      />

    </ScrollView>
  );
};

export default DetailScreen;
