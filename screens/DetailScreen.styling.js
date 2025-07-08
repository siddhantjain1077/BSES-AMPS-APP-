import { StyleSheet } from 'react-native';

const getStyles = (colors, isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: colors.background,
    },

    BijliSevaKendraImage: {
      width: '100%',
      height: 170,
      marginBottom: 12,
      marginTop: 17,
    },

    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 6,
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderColor: isDark ? '#555' : '#ccc',
      paddingBottom: 6,
    },

    label: {
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
    },
    value: {
      color: colors.text,
      flex: 1.2,
      textAlign: 'right',
      flexShrink: 1,
      flexWrap: 'wrap',
      maxWidth: '100%',
    },

    collapsibleContainer: {
      marginBottom: 12,
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    radioButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.primary ?? '#007ACC',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    radioButtonInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: colors.primary ?? '#007ACC',
    },
    radioLabel: {
      fontSize: 16,
      color: colors.text,
    },
    totalReasonsText: {
      marginVertical: 10,
      fontStyle: 'italic',
      color: colors.text,
    },

    collapsibleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#007ACC',
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.text,
    },

    collapsibleTitle: {
      fontSize: 18,
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    toggleIcon: {
      fontSize: 18,
      color: colors.text,
      marginLeft: 10,
    },
    collapsibleContent: {
      backgroundColor: colors.card,
      padding: 12,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderTopWidth: 1,
      borderColor: '#007ACC',
    },


    cfEntryCard: {
      marginBottom: 10,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: colors.card,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      flexWrap: 'wrap',
      overflow: 'hidden',
      maxWidth: '100%'
    },

    mcdEntryCard: {
      marginBottom: 12,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: colors.card,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
    },

    tfRevisitContainer: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      marginTop: 12,
      marginBottom: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      alignItems: 'center',
    },
    tfRevisitTitle: {
      fontSize: 18,
      backgroundColor: '#007ACC',
      color: '#fff',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
      fontWeight: 'bold',
      marginBottom: 15,
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    tfRevisitButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    rejectButton: {
      backgroundColor: '#FF4136',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      flex: 1,
      marginRight: 10,
      alignItems: 'center',
    },
    approveButton: {
      backgroundColor: '#2ECC40',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      flex: 1,
      marginLeft: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      elevation: 10,
    },
    modalView: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      elevation: 20,
      width: '90%',
      maxHeight: '80%',
      zIndex: 1000,
      color: colors.isDark ? '#fff' : '#ccc'
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.text,
    },
    commentInput: {
      height: 100,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      textAlignVertical: 'top',
      marginBottom: 20,
      color: colors.text,
    },

    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalBackButton: {
      backgroundColor: '#d9534f',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    modalSubmitButton: {
      backgroundColor: '#5cb85c',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    dropdownContainer: {
      marginBottom: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      maxHeight: 150,
    },
   engineerCard: {
  padding: 12,
  marginVertical: 8,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#f2f2f2',
},
    selectedEngineerCard: {
  borderColor: '#007bff',
  backgroundColor: '#e6f0ff',
},
    engineerText: {
      fontSize: 14,
      color: colors.text,
    },

    dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },

    dropdownItemText: {
      fontSize: 16,
      color: colors.text,
    },
    selectedDropdownItem: {
      backgroundColor: isDark ? '#333' : '#e6f0ff',
      borderRadius: 6,
    },
    dropdownContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  marginVertical: 10,
},

pickerStyle: {
  height: 60,
  // width: '100%',  
  color: colors.text,
  fontSize: 14,
}
  });

export default getStyles;
