import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    LayoutAnimation,
    Modal,
    TextInput,
} from 'react-native';
import getStyles from './DetailScreen.styling';
import bijli_image from '../assets/BijliSevaKendra.png';
import { useTheme } from '../screens/ThemeContext';

const CollapsibleCard = ({ title, children, initialExpanded = true }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);

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

const KeyValue = ({ label, value, color }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);
    return (
        <View style={styles.row}>
            <Text style={[styles.label, { color: color ?? colors.text }]}>{label}</Text>
            <Text style={[styles.value, { color: color ?? colors.text }]}>{value}</Text>
        </View>
    );
};

const RejectReasonModal = ({ visible, onClose, onSubmit }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const [selectedReason, setSelectedReason] = useState(null);
    const [comment, setComment] = useState('');
    const [totalSelectedReasons, setTotalSelectedReasons] = useState(0);

    const handleReasonSelect = (reason) => {
        setSelectedReason(reason);
        setTotalSelectedReasons(reason ? 1 : 0);
    };

    const handleSubmit = () => {
        onSubmit({ selectedReason, comment });
        setSelectedReason(null);
        setComment('');
        setTotalSelectedReasons(0);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Reasons for Rejection</Text>
                    {['TF Deficiency', 'CF Deficiency', 'TF + CF Deficiency'].map((reason) => (
                        <TouchableOpacity key={reason} onPress={() => handleReasonSelect(reason)} style={styles.radioButtonContainer}>
                            <View style={styles.radioButton}>
                                {selectedReason === reason && <View style={styles.radioButtonInner} />}
                            </View>
                            <Text style={styles.radioLabel}>{reason}</Text>
                        </TouchableOpacity>
                    ))}
                    <Text style={styles.totalReasonsText}>Total Selected Reasons = {totalSelectedReasons}</Text>
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
                        <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSubmit} disabled={!selectedReason}>
                            <Text style={[styles.buttonText, !selectedReason && { opacity: 0.5 }]}>Submit</Text>
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
                        <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSubmit} disabled={!comment.trim()}>
                            <Text style={[styles.buttonText, !comment.trim() && { opacity: 0.5 }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const TFrevisitModal = ({ visible, onClose, onSubmit }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);
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
                        <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSubmit} disabled={!comment.trim()}>
                            <Text style={[styles.buttonText, !comment.trim() && { opacity: 0.5 }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const DetailScreen = ({ route }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const [isRejectModalVisible, setRejectModalVisible] = useState(false);
    const [isApproveModalVisible, setApproveModalVisible] = useState(false);
    const [isTFRevisitVisible, setTFRevisitVisible] = useState(false);

    const data = route.params?.data || {
        // Same data as provided previously (omitted here for brevity)
        orderNo: '008007158358',
        applicantName: 'SWATI . DEVI',
        premisesAddress: 'QTR. 806 SEC-1, R K PURAM NEW DELHI . 1ST FLOOR TYPE-2 DELHI 110022',
        division: 'S2RKP',
        fatherName: 'W/O SH.ANKIT KUMAR',
        orderDate: '30/08/2024 09:38:12 AM',

        appliedCategory: 'Domestic',
        typeOfBuilding: 'Non-Residential',
        connectionType: 'U01',
        loadKW: '3.00',
        feederPillarNo: 'RKPS941',
        representativeAvailability: 'Yes',

        selectedByMMG: '2550RKP-VVR008A-1',
        nearByCA: '154089824',
        peakLoad: '80.18',
        statusWithOMList: 'DT Unmatched',
        listOfDTSelectedByOM: 'N/A',

        systemLocalityType: 'Cooperative Group Housing Society',
        tfAreaType: 'Electrified',
        supplyTypePhase: '1-Ph',
        tfStructureOfPremises: 'Vacant Land',
        tfNatureOfUse: 'DJB',
        tfCableSize: '2X25LT',
        cableType: 'Loop (2)',
        serviceLineLength: '21',
        rcpRequired: 'Yes',
        tfBusBarType: 'Yes',
        wiringCompleted: 'Yes',
        subStationSpaceRequired: 'Yes',
        wiringTestReportVerified: 'Yes',
        existingMeterNo: 'N/A',

        dwellingUnitWithSeparateEntry: 'Yes',
        enforcementLead: 'Theft',
        commonAreaParkingStatusStilt: 'Yes',
        encroachment: 'Yes',
        liftStatus: 'Install',
        liftCertificate: 'Yes',
        liftAffidavit: 'Yes',
        plotAreaSqm: '41',
        coveredAreaSqm: '21',
        poleOverloadedHazardous: 'Yes',
        longServiceLine: 'Yes',
        underHTLTLine: 'Yes',
        mmgRemark: 'Test remark',

        safeMeterSpace: 'Yes',
        separateRoomAvailableForMeterInstallation: 'Yes',
        outsideProjectionWallCreatedForMeterInstallation: 'Yes',
        spaceAvailableForMeterInstallationOutsidePremises: 'Yes',
        sufficientSpaceAvailableAtParkingAreaWithIsolation: 'Yes',
        separateEscapeRouteAvailableAtSite: 'Yes',
        meterPanelAsPerListedSpecification: 'Yes',
        privateBusBar: 'Yes',
        mcbAvailable: 'Yes',
        elcbAvailable: 'Yes',

        cfDetails: [
            {
                ca: 'NA',
                netOSAmt: '',
                name: '',
                address: '1-C Sector 1 RK Puram,',
                bp: 'NA',
                seqNo: '1000/Legacy / RKP/71',
                moveOutDate: 'NA',
                consref: 'NA',
                userType: 'Beneficiary',
                checkEnf: 'Non Related',
                cfRemarks: 'NA',
            },
            {
                ca: 'NA',
                netOSAmt: '',
                name: 'N.A .',
                address: '1-C , Sector-1 , R . K . Puram , New Delhi .',
                bp: 'NA',
                seqNo: 'DRN 2022|01 | 4842',
                moveOutDate: 'NA',
                consref: 'NA',
                userType: 'Suspected Case',
                checkEnf: 'Non Related',
                cfRemarks: 'Tester 1234',
            },
        ],

        mcdDetails: [
            {
                nameOfUnit: 'N/A',
                addressOfProperty: 'House No . 14 , Ground Floor , Satya Niketan , New Delhi-110021 .',
                aLetterRefNo: 'F . No . DPCC/OA-958/2019 / CMC-IV/2020/4099-4103',
                drnNo: 'DRN|2020|01|1500',
                authorityName: 'DPCC',
                mcdStatus: 'Beneficiary',
                assignedTo: 'NA',
                mcdRemarks: 'NA',
            },
            {
                nameOfUnit: 'N.A .',
                addressOfProperty: '294 , Second Floor , Satyr Niketan , New Delhi-110021 .',
                aLetterRefNo: 'F . No . DPCC/OA-958/2019 / CMC-IV/2020/4381-4385',
                drnNo: 'DRN|2020|06|1746',
                authorityName: 'DPCC',
                mcdStatus: 'Suspected Case',
                assignedTo: 'NA',
                mcdRemarks: 'Test1234',
            },
            {
                nameOfUnit: 'N.A .',
                addressOfProperty: '95 , Ground Floor , Satya Niketan , New Delhi-110021 .',
                aLetterRefNo: 'F . No . DPCC/OA-958/2019 / CMC-IV/2020/4281-4285',
                drnNo: 'DRN|2020|06|1767',
                authorityName: 'DPCC',
                mcdStatus: 'Suspected Case',
                assignedTo: 'NA',
                mcdRemarks: 'Test111',
            },
        ]
    };

    const handleApproveSubmit = (comment) => {
        console.log('Approved with comment:', comment);
        setApproveModalVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={bijli_image} style={styles.BijliSevaKendraImage} resizeMode="contain" />
            <Text style={styles.sectionTitle}>Order Info</Text>

            <CollapsibleCard title="Basic Details">
                <KeyValue label="Order No." value={data.orderNo} />
                <KeyValue label="Name" value={data.applicantName} />
                <KeyValue label="Address" value={data.premisesAddress} />
                <KeyValue label="Date" value={data.orderDate} />
                <KeyValue label="Status" value={data.statusWithOMList} />
            </CollapsibleCard>

            {/* Connection Details Section as Collapsible Card */}
            <CollapsibleCard title="Connection Details" initialExpanded={false}>
                <KeyValue label="Applied Category" value={data.appliedCategory} />
                <KeyValue label="Type of Building" value={data.typeOfBuilding} />
                <KeyValue label="Connection Type" value={data.connectionType} />
                <KeyValue label="Load (KW)" value={data.loadKW} />
                <KeyValue label="Pole/Feeder Pillar No." value={data.feederPillarNo} />
                <KeyValue label="Representative Availability" value={data.representativeAvailability} />
            </CollapsibleCard>

            {/* Parameters for DT Selected by MMG Section as Collapsible Card */}
            <CollapsibleCard title="Parameters for DT Selected by MMG" initialExpanded={false}>
                <KeyValue label="Selected by MMG" value={data.selectedByMMG} />
                <KeyValue label="Near by CA" value={data.nearByCA} />
                <KeyValue label="Peak Load" value={data.peakLoad} />
                <KeyValue label="Status With O&M List" value={data.statusWithOMList} />
                <KeyValue label="List of DT Selected by O&M" value={data.listOfDTSelectedByOM} />
            </CollapsibleCard>

            {/* TF Details Punched by MMG Section as Collapsible Card */}
            <CollapsibleCard title="TF Details Punched by MMG" initialExpanded={false}>
                <KeyValue label="System Locality Type" value={data.systemLocalityType} />
                <KeyValue label="TF Area Type" value={data.tfAreaType} />
                <KeyValue label="Supply Type Phase" value={data.supplyTypePhase} />
                <KeyValue label="TF Structure of Premises" value={data.tfStructureOfPremises} />
                <KeyValue label="TF Nature of Use" value={data.tfNatureOfUse} />
                <KeyValue label="TF Cable Size (Existing)" value={data.tfCableSize} />
                <KeyValue label="Cable Type" value={data.cableType} />
                <KeyValue label="Service Line Length (Mtr)" value={data.serviceLineLength} />
                <KeyValue label="RCP Required" value={data.rcpRequired} />
                <KeyValue label="TF Bus Bar Type" value={data.tfBusBarType} />
                <KeyValue label="Wiring Completed" value={data.wiringCompleted} />
                <KeyValue label="Sub Station Space Required" value={data.subStationSpaceRequired} />
                <KeyValue label="Wiring Test Report Verified" value={data.wiringTestReportVerified} />
                <KeyValue label="Existing Meter No" value={data.existingMeterNo} />
                <KeyValue label="Dwelling Unit With Separate Entry" value={data.dwellingUnitWithSeparateEntry} />
                <KeyValue label="Enforcement Lead" value={data.enforcementLead} />
                <KeyValue label="Common Area/Parking Status/Stilt" value={data.commonAreaParkingStatusStilt} />
                <KeyValue label="Encroachment" value={data.encroachment} />
                <KeyValue label="Lift Status" value={data.liftStatus} />
                <KeyValue label="Lift Certificate" value={data.liftCertificate} />
                <KeyValue label="Lift Affidavit" value={data.liftAffidavit} />
                <KeyValue label="Plot Area (Sqm)" value={data.plotAreaSqm} />
                <KeyValue label="Covered Area (Sqm)" value={data.coveredAreaSqm} />
                <KeyValue label="Pole Overloaded / Hazardous" value={data.poleOverloadedHazardous} />
                <KeyValue label="Long Service Line" value={data.longServiceLine} />
                <KeyValue label="Under HT/LT Line" value={data.underHTLTLine} />
                <KeyValue label="MMG Remark" value={data.mmgRemark} />
            </CollapsibleCard>

            {/* SAFETY METER DETAILS Section as Collapsible Card */}
            <CollapsibleCard title="SAFETY METER DETAILS" initialExpanded={false}>
                <KeyValue label="Safe meter space" value={data.safeMeterSpace} />
                <KeyValue label="Separate room available for meter installation" value={data.separateRoomAvailableForMeterInstallation} />
                <KeyValue label="Outside projection wall created for meter installation" value={data.outsideProjectionWallCreatedForMeterInstallation} />
                <KeyValue label="Space available for meter installation outside the premises" value={data.spaceAvailableForMeterInstallationOutsidePremises} />
                <KeyValue label="Sufficient space available at parking area with isolation" value={data.sufficientSpaceAvailableAtParkingAreaWithIsolation} />
                <KeyValue label="Separate escape route available at site" value={data.separateEscapeRouteAvailableAtSite} />
                <KeyValue label="Meter Panel as per listed specification" value={data.meterPanelAsPerListedSpecification} />
                <KeyValue label="Private BusBar" value={data.privateBusBar} />
                <KeyValue label="MCB Available" value={data.mcbAvailable} />
                <KeyValue label="ELCB Available" value={data.elcbAvailable} />
            </CollapsibleCard>

            {/* CF DETAILS Section as Collapsible Card */}
            <CollapsibleCard title="CF DETAILS" colors={colors}>
                {Array.isArray(data.cfDetails) && data.cfDetails.map((entry, index) => (
                    <View key={index} style={styles.cfEntryCard}>
                        <KeyValue label="CA" value={entry.ca} color={colors.text} />
                        <KeyValue label="Net OS Amt" value={entry.netOSAmt} color={colors.text} />
                        <KeyValue label="Name" value={entry.name} color={colors.text} />
                        <KeyValue label="Address" value={entry.address} color={colors.text} />
                    </View>
                ))}
            </CollapsibleCard>

            {/* MCD DETAILS Section as Collapsible Card */}
            <CollapsibleCard title="MCD DETAILS" initialExpanded={false}>
                {Array.isArray(data.mcdDetails) && data.mcdDetails.map((entry, index) => (
                    <View key={index} style={styles.mcdEntryCard}>
                        <KeyValue label="Name of Unit" value={entry.nameOfUnit} color={colors.text} />
                        <KeyValue label="Address of Property" value={entry.addressOfProperty} color={colors.text} />
                    </View>
                ))}
            </CollapsibleCard>
            {/* Action buttons and modals */}
            <View style={styles.tfRevisitContainer}>
                <TouchableOpacity style={styles.tfRevisitButton} onPress={() => setTFRevisitVisible(true)}>
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
                onSubmit={(data) => {
                    console.log('Rejected with:', data);
                    setRejectModalVisible(false);
                }}
            />
            <ApproveCommentModal
                visible={isApproveModalVisible}
                onClose={() => setApproveModalVisible(false)}
                onSubmit={handleApproveSubmit}
            />
            <TFrevisitModal
                visible={isTFRevisitVisible}
                onClose={() => setTFRevisitVisible(false)}
                onSubmit={(comment) => {
                    console.log('TF Revisit Comment:', comment);
                    setTFRevisitVisible(false);
                }}
            />
        </ScrollView>
    );
};

export default DetailScreen;