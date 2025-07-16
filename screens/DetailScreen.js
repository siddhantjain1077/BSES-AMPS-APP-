import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import getStyles from '../screens/DetailScreen.styling';
import { useTheme } from '../screens/ThemeContext';
import bijliLight from '../assets/Bijli_kendra_white.png';
import bijliDark from '../assets/BijliSevaKendra_withoutBG.png';
import { VIEW_PENDING_URL } from '../Services/api';
import { TF_ENG_LIST_URL, postRequest } from '../Services/api';
import { DROPDOWN_LIST_URL } from '../Services/api';
import { Picker } from '@react-native-picker/picker';
// import { TF_ENG_LIST_URL } from '../Services/api';
import { COMPLETED_CASE_URL } from '../Services/api';
import { ARAActions } from '../Services/api'; // Make sure this constant is defined correctly
import { TouchableWithoutFeedback } from 'react-native';
import { historyLogs as historyLogsURL } from '../Services/api'; // ✅ Rename the import


const CollapsibleCard = ({ title, children, isExpanded, onToggle }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity onPress={onToggle} style={styles.collapsibleHeader}>
        <Text style={[styles.collapsibleTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.toggleIcon, { color: colors.text }]}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};


const KeyValue = ({ label, value }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text }]}>
        {value && String(value).trim() !== '' ? value : 'N.A'}
      </Text>

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
        console.log('[📥 Fetching Deficiency List]', response);
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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { }}>
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
                  {dropdownItems
                    .filter((item) => {
                      const groupCode = item.groupCode?.toLowerCase?.();
                      if (selectedReason === 'TF Deficiency') return groupCode === 'tf001';
                      if (selectedReason === 'CF Deficiency') return groupCode === 'ds002';
                      if (selectedReason === 'TF + CF Deficiency') return ['td001', 'ac016'].includes(groupCode);
                      return false; // show nothing if no match
                    })
                    .map((item, index) => (
                      <Picker.Item key={index} label={item.codeText} value={item.code} />
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
            <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const DetailScreen = () => {
  const [expandedCard, setExpandedCard] = useState('Basic Details');
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const [isApproveModalVisible, setApproveModalVisible] = useState(false);
  const [isTFRevisitVisible, setTFRevisitVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);


  const route = useRoute();
  const { orderDetails } = route.params || {};

  useEffect(() => {
    const fetchHistoryLogs = async () => {
      try {
        setHistoryLoading(true);

        const payload = {
          userid: 'dsktfauTo',
          division: route?.params?.orderDetails?.division,
          orderNo: route?.params?.orderDetails?.orderNo,
        };

        console.log('[📥 Sending Payload]', payload);

        const response = await postRequest(historyLogsURL, payload);

        console.log('[📥 Response of HISTORY LOGS]', response?.data);

        if (response?.success && Array.isArray(response.data)) {
          setHistoryLogs(response.data);
        } else {
          setHistoryLogs([]);
        }
      } catch (error) {
        console.error('[❌ Error fetching history logs]', error);
        setHistoryLogs([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistoryLogs();
  }, []);

  const mobile =
    data?.mobileNo ||
    orderDetails?.consumerNumber ||
    orderDetails?.consumerMobile ||
    orderDetails?.mobileNo ||
    orderDetails?.mobile;


  const handleRejectSubmit = async ({ selectedReason, code, comment }) => {
    const orderNo = orderDetails?.orderNo || '';
    const division = orderDetails?.division || 'S2RKP';
    const zdin = orderDetails?.zdin || '';
    const actionType = orderDetails?.caseFlags?.reject ?? 'R'; // fallback to 'R'
    const tfUserId = 'dsk tfauTo';
    const tfName = 'John Doe';
    const version = '1.0';

    if (!orderNo || !actionType) {
      Alert.alert('Missing Info', 'Order number or action type missing.');
      return;
    }

    // Base payload
    console.log('🔍 Debug Before Submission');
    console.log('Order No:', orderNo);
    console.log('Action Type:', actionType);
    console.log('Consumer Number:', orderDetails?.mobileNo);
    console.log('Code:', code);
    console.log('Reason:', selectedReason);
    console.log('🧾 orderDetails:', orderDetails);
    console.log('🧾 Full orderDetails:', JSON.stringify(orderDetails, null, 2));
    console.log('✅ Final Mobile for Submission:', data?.mobileNo || mobile);

    const payload = {
      orderNo,
      actionType,
      remark: comment || '',
      division,
      userId: tfUserId,
      consumerNumber: data?.mobileNo || mobile,
      punchVersion: version,
      tfUserId,
      tfName,
    };

    // Include these only if it's a rejection
    if (actionType === 'R') {
      if (!code || !selectedReason) {
        Alert.alert('Missing Info', 'Please select reason and code for rejection.');
        return;
      }

      payload.rejectionReasonCodeList = [code];
      payload.deftyype =
        selectedReason.trim() === 'CF Deficiency'
          ? 'CF'
          : selectedReason.trim() === 'TF Deficiency'
            ? 'TF'
            : selectedReason.trim() === 'TF + CF Deficiency'
              ? 'TF+CF'
              : '';
    }

    try {
      console.log('[📤 Reject Payload]', JSON.stringify(payload, null, 2));
      const response = await postRequest(ARAActions, payload);
      console.log('[✅ Reject Success]', response);

      Alert.alert('Rejected', 'Order has been rejected successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (err) {
      console.error('[❌ Reject Error]', err);
      Alert.alert('Error', 'Failed to reject the order.');
    }

    setRejectModalVisible(false);
  };


  const handleApproveSubmit = async (comment) => {
    const orderNo = orderDetails?.orderNo || '';
    const division = orderDetails?.division || 'S2RKP';
    const zdin = orderDetails?.zdin || '';
    const actionType = orderDetails?.caseFlags?.approve ?? 'Y'; // fallback to 'Y'
    const tfUserId = 'dsktfauTo';
    const tfName = 'John Doe';
    const version = '1.0';

    const consumerNumber = orderDetails?.consumerNumber || orderDetails?.consumerMobile || data?.mobileNo;

    if (!orderNo || !actionType) {
      Alert.alert('Missing Info', 'Order No, Action Type, or Consumer Number is missing.');
      console.warn('Missing required fields for approval:', { orderNo, actionType, consumerNumber });
      return;
    }

    const payload = {
      orderNo,
      actionType,
      remark: comment || '',
      division,
      userId: tfUserId,
      consumerNumber: data?.mobileNo || mobile || orderDetails?.mobileNo,
      punchVersion: version,
      tfUserId,
      tfName,
    };

    console.log('[📤 Final Approve Payload]', JSON.stringify(payload, null, 2));

    try {
      const response = await postRequest(ARAActions, payload);
      console.log('[✅ Response from ARAActions]', response);

      if (!response.success) {
        console.warn('[❗ Approve Failed]', response);
        Alert.alert('Approval Failed', response?.message || 'Unknown server error.');
        return;
      }

      Alert.alert('Approved', 'Order has been approved successfully.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (err) {
      console.error('[❌ Approve Error]', err.message);
      Alert.alert('Error', err.message || 'Approval failed due to server error.');
    } finally {
      setApproveModalVisible(false);
    }
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
          const payload = {
            userId: 'dsktfauTo',
            division: orderDetails?.division || 'S2RKP',
            orderNo: orderDetails?.orderNo,
            zdin: orderDetails?.zdin,
            comment: comment,
          };

          const response = await postRequest(TF_ENG_LIST_URL, payload);

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
    }, [visible, userId, division]);

    const handleSubmit = () => {
      if (selectedEngineer) {
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
                  const isSelected = selectedEngineer?.tfUserId === eng.tfUserId

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
                disabled={!selectedEngineer}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const handleTFRevisitSubmit = async ({ engineer, comment }) => {
    try {
      const payload = {
        engineerId: engineer.tfUserId,
        orderNo: orderDetails.orderNo,
        division: 'S2RKP',
        zdin: orderDetails.zdin,
        comment: comment,
        userId: 'dsktfauTo',
      };

      console.log('[📤 Submitting TF Revisit]', payload);

      const response = await postRequest(TF_ENG_LIST_URL, payload);

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
        console.log('[📥 Order Details API Response]', response.data);
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={isDark ? bijliDark : bijliLight} 
      style={styles.BijliSevaKendraImage} 
      resizeMode="contain" />
      <Text style={styles.sectionTitle}>Order Info:</Text>

      <CollapsibleCard
        title="Basic Details"
        isExpanded={expandedCard === 'Basic Details'}
        onToggle={() => setExpandedCard(expandedCard === 'Basic Details' ? null : 'Basic Details')}
      >
        <KeyValue label="Order No." value={data.orderNo} />
        <KeyValue label="Name" value={data.name} />
        <KeyValue label="Father's Name" value={data.fatherName} />
        <KeyValue label="Mobile No." value={data.mobileNo} />
        <KeyValue label="Address" value={data.address} />
        <KeyValue label="Order Date" value={data.orderDate} />
        <KeyValue label="Division" value={data.division} />
        <KeyValue label="ZDIN" value={data.zdin} />
      </CollapsibleCard>

      <CollapsibleCard title="Connection Details"
        isExpanded={expandedCard === 'Connection Details'}
        onToggle={() => setExpandedCard(expandedCard === 'Connection Details' ? null : 'Connection Details')}
      >
        <KeyValue label="Category" value={data.categoryName} />
        <KeyValue label="Request Type" value={data.requestType} />
        <KeyValue label="Applied Load (KW)" value={data.appliedloadinkw} />
        <KeyValue label="Meter Type" value={data.meterType} />
        <KeyValue label="Connection Phase" value={data.supplytypE_PHASE} />
      </CollapsibleCard>

      <CollapsibleCard title="Infrastructure"
        isExpanded={expandedCard === 'Infrastructure'}
        onToggle={() => setExpandedCard(expandedCard === 'Infrastructure' ? null : 'Infrastructure')}>
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

      <CollapsibleCard title="Enforcement & Safety"
        isExpanded={expandedCard === 'Enforcement & Safety'}
        onToggle={() => setExpandedCard(expandedCard === 'Enforcement & Safety' ? null : 'Enforcement & Safety')}>
        <KeyValue label="Enforcement Lead" value={data.enforcementlead} />
        <KeyValue label="Under HT/LT Line" value={data.undeR_HT_LT_LINE} />
        <KeyValue label="Pole Overloaded/Hazardous" value={data.ispolehazardous} />
        <KeyValue label="Private Bus Bar" value={data.privatE_BUS_BAR} />
        <KeyValue label="Representative Available" value={data.representativeavailability} />
        <KeyValue label="Wiring Test Report" value={data.wiringtestreport} />
        <KeyValue label="ELCB Available" value={data.elcB_AVAILABLE} />
        <KeyValue label="MCB Available" value={data.mcB_AVAILABLE} />
      </CollapsibleCard>

      <CollapsibleCard title="TF Details"
        isExpanded={expandedCard === 'TF Details'}
        onToggle={() => setExpandedCard(expandedCard === 'TF Details' ? null : 'TF Details')}>
        <KeyValue label="TF Area Type" value={data.tfareatype} />
        <KeyValue label="Locality Type" value={data.tflocalitytype} />
        <KeyValue label="Nature of Use" value={data.tfnatureofuse} />
        <KeyValue label="TF Structure of Premises" value={data.tfstructureofpremises} />
      </CollapsibleCard>

      <CollapsibleCard title="Property Details"
        isExpanded={expandedCard === 'Property Details'}
        onToggle={() => setExpandedCard(expandedCard === 'Property Details' ? null : 'Property Details')}>
        <KeyValue label="Plot Area" value={data.ploT_AREA} />
        <KeyValue label="Covered Area" value={data.covereD_AREA} />
        <KeyValue label="Common Area Parking" value={data.commaN_AREA_PARKING} />
        <KeyValue label="Separate Entry" value={data.separatE_ENTRY} />
        <KeyValue label="Separate Meter Available" value={data.seperatE_MTR_AVAILABLE} />
      </CollapsibleCard>

      <CollapsibleCard title="MMG Information"
        isExpanded={expandedCard === 'MMG Information'}
        onToggle={() => setExpandedCard(expandedCard === 'MMG Information' ? null : 'MMG Information')}>
        <KeyValue label="MMG DT" value={data.mmgDt} />
        <KeyValue label="MMG Meter Location" value={data.mmgMeterLocation} />
        <KeyValue label="MMG Meter Quality" value={data.mmgMeterQualityStatus} />
      </CollapsibleCard>

      <CollapsibleCard title="CF Details"
        isExpanded={expandedCard === 'CF Details'}
        onToggle={() => setExpandedCard(expandedCard === 'CF Details' ? null : 'CF Details')}>
        {(data.cfDataList || []).map((cf, idx) => (
          <React.Fragment key={idx}>
            <KeyValue label="CA" value={cf.ca} />
            <KeyValue label="Net OS Amt" value={cf.netOSAmt} />
            <KeyValue label="Name" value={cf.name} />
            <KeyValue label="Address" value={cf.address} />
          </React.Fragment>
        ))}
      </CollapsibleCard>

      <CollapsibleCard title="MCD Details"
        isExpanded={expandedCard === 'MCD Details'}
        onToggle={() => setExpandedCard(expandedCard === 'MCD Details' ? null : 'MCD Details')}>
        {(data.mcdDataList || []).map((mcd, idx) => (
          <React.Fragment key={idx}>
            <KeyValue label="Unit Name" value={mcd.nameOfUnit} />
            <KeyValue label="Property Address" value={mcd.addressOfProperty} />
          </React.Fragment>
        ))}
      </CollapsibleCard>

      <CollapsibleCard
        title="History Logs"
        isExpanded={expandedCard === 'History Logs'}
        onToggle={() =>
          setExpandedCard(expandedCard === 'History Logs' ? null : 'History Logs')
        }
      >
        {historyLoading ? (
          <Text style={{ color: colors.text }}>Loading history...</Text>
        ) : historyLogs.length === 0 ? (
          <Text style={{ color: colors.text }}>No history logs found.</Text>
        ) : (
          historyLogs.map((log, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>
                <Text style={{ fontWeight: 'bold'}}>Date:</Text> {log.entryDate}
              </Text>
              <Text style={{ color: colors.text }}>
                <Text style={{ fontWeight: 'bold' }}>User Name:</Text> {log.userName || 'N.A'}
              </Text>
              <Text style={{ color: colors.text }}>
                <Text style={{ fontWeight: 'bold' }}>Remarks:</Text> {log.remarks || 'No remarks'}
              </Text>
              <Text style={{ color: colors.text }}>
                <Text style={{ fontWeight: 'bold' }}>Action:</Text> {log.action}
              </Text>
              <Text style={{ color: colors.text }}>
                <Text style={{ fontWeight: 'bold' }}>Level:</Text> {log.levelType || 'N.A'}
              </Text>

              <View
                style={{
                  height: 2,
                  backgroundColor: colors.border || '#ccc',
                  marginTop: 6,
                }}
              />
            </View>
          ))
        )}
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

      <RejectReasonModal
        visible={isRejectModalVisible}
        onClose={() => setRejectModalVisible(false)}
        onSubmit={handleRejectSubmit}
      />

      <ApproveCommentModal
        visible={isApproveModalVisible}
        onClose={() => setApproveModalVisible(false)}
        onSubmit={handleApproveSubmit}
      />

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
