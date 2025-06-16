import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

container: {
flex: 1,
padding: 12,
backgroundColor: '#fff',
},

BijliSevaKendraImage: {
width: '100%',
height: 150,
marginBottom: 12,
marginTop: 50,
textAlign: 'center',
alignItems: 'center',
},
row: {
flexDirection: 'row',
marginVertical: 6,
justifyContent: 'space-between',
},
label: {
fontWeight: 'bold',
color: '#333',
flex: 1,
},
value: {
color: '#444',
flex: 1.2,
textAlign: 'right',
flexShrink: 1, 
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
collapsibleTitle: {
fontSize: 18,
color: 'white',
fontWeight: 'bold',
flex: 1,
},
toggleIcon: {
fontSize: 18,
color: 'white',
marginLeft: 10,
},
collapsibleContent: {
backgroundColor: '#fff4d6',
padding: 12,
borderBottomLeftRadius: 8,
borderBottomRightRadius: 8,
borderTopWidth: 1,
borderColor: '#007ACC',
},
// Styles for CFDetailEntry component
cfEntryCard: {
marginBottom: 12, // Space between multiple CF entries
borderRadius: 8,
overflow: 'hidden',
borderWidth: 1, // Add a border for the inner card
borderColor: '#ddd',
backgroundColor: '#fff', // White background for the inner card
elevation: 1, // Subtle shadow for inner card
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.08,
shadowRadius: 2,
},
cfEntryHeader: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#007ACC',
paddingVertical: 8,
paddingHorizontal: 10,
borderTopLeftRadius: 8,
borderTopRightRadius: 8,
},
cfIndexCircle: {
width: 24,
height: 24,
borderRadius: 12, // Makes it a circle
backgroundColor: '#fff', // White circle
justifyContent: 'center',
alignItems: 'center',
marginRight: 10,
},
cfIndexText: {
color: '#007ACC', // Blue text for the number
fontWeight: 'bold',
fontSize: 14,
},
cfHeaderContent: {
flex: 1,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
flexWrap: 'wrap', // Allow content to wrap if space is tight
},
cfHeaderRow: {
flexDirection: 'row',
alignItems: 'center',
marginRight: 10, // Space between CA and Net OS Amt
},
cfHeaderLabel: {
color: 'white',
fontWeight: 'bold',
fontSize: 14,
marginRight: 5,
},
cfHeaderValue: {
color: 'white',
fontSize: 14,
},
cfEntryDetails: {
padding: 12,
backgroundColor: '#fff4d6', // Light yellow background for details
borderBottomLeftRadius: 8,
borderBottomRightRadius: 8,
},
// NEW styles for MCDDetailEntry component (similar to CF but adapted for its header)
mcdEntryCard: {
marginBottom: 12, // Space between multiple MCD entries
borderRadius: 8,
overflow: 'hidden',
borderWidth: 1,
borderColor: '#ddd',
backgroundColor: '#fff',
elevation: 1,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.08,
shadowRadius: 2,
},
mcdEntryHeader: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#007ACC',
paddingVertical: 8,
paddingHorizontal: 10,
borderTopLeftRadius: 8,
borderTopRightRadius: 8,
},
mcdIndexCircle: {
width: 24,
height: 24,
borderRadius: 12,
backgroundColor: '#fff',
justifyContent: 'center',
alignItems: 'center',
marginRight: 10,
},
mcdIndexText: {
color: '#007ACC',
fontWeight: 'bold',
fontSize: 14,
},
mcdHeaderContent: {
flex: 1,
flexDirection: 'row', // Keep it row for label-value
alignItems: 'center', // Align label and value vertically
},
mcdHeaderLabel: {
color: 'white',
fontWeight: 'bold',
fontSize: 14,
marginRight: 5, // Space between label and value
},
mcdHeaderValue: {
color: 'white',
fontSize: 14,
flexShrink: 1, // Allow text to wrap
},
mcdEntryDetails: {
padding: 12,
backgroundColor: '#fff4d6',
borderBottomLeftRadius: 8,
borderBottomRightRadius: 8,
},
tfRevisitContainer: {
backgroundColor: '#fff',
borderRadius: 8,
padding: 12,
marginTop: 12,
marginBottom: 20, // Space at the bottom
elevation: 3,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 3,
alignItems: 'center', // Center content horizontally
},
tfRevisitTitle: {
fontSize: 18,
backgroundColor: '#007ACC', // Match header blue
color: 'white',
paddingVertical: 8,
paddingHorizontal: 15,
borderRadius: 8, // Rounded background for the title
fontWeight: 'bold',
marginBottom: 15,
alignSelf: 'stretch', // Make the background fill the width
textAlign: 'center',
},
tfRevisitButtons: {
flexDirection: 'row',
justifyContent: 'space-around', // Space out buttons
width: '100%',
},
rejectButton: {
backgroundColor: '#FF4136', // Red color
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 8,
flex: 1, // Take equal space
marginRight: 10, // Space between buttons
alignItems: 'center',
},
approveButton: {
backgroundColor: '#2ECC40', // Green color
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 8,
flex: 1, // Take equal space
marginLeft: 10, // Space between buttons
alignItems: 'center',
},
buttonText: {
color: 'white',
fontWeight: 'bold',
fontSize: 16,
},
centeredView: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.5)', // Dim background
},
modalView: {
margin: 20,
backgroundColor: 'white',
borderRadius: 20,
padding: 35,
alignItems: 'flex-start', // Align content to the left
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5,
width: '90%', // Occupy most of the screen width
maxHeight: '80%', // Limit height to prevent overflow
},
modalTitle: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 20,
alignSelf: 'center', // Center the title
color: '#333',
},
radioButtonContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 15,
},
radioButton: {
height: 24,
width: 24,
borderRadius: 12,
borderWidth: 2,
borderColor: '#007ACC', // Blue border
alignItems: 'center',
justifyContent: 'center',
marginRight: 10,
},
radioButtonInner: {
height: 12,
width: 12,
borderRadius: 6,
backgroundColor: '#007ACC', // Blue fill when selected
},
radioLabel: {
fontSize: 16,
color: '#333',
},
totalReasonsText: {
fontSize: 16,
fontWeight: 'bold',
marginTop: 10,
marginBottom: 20,
color: '#555',
},
dropdownPlaceholder: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 8,
padding: 12,
width: '100%',
marginBottom: 20,
backgroundColor: '#f9f9f9',
},
dropdownText: {
color: '#666',
fontSize: 16,
},
dropdownArrow: {
color: '#666',
fontSize: 16,
},
commentInput: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 8,
padding: 10,
width: '100%',
minHeight: 100, // Make it larger for comments
marginBottom: 20,
fontSize: 16,
color: '#333',
},
modalButtonsContainer: {
flexDirection: 'row',
justifyContent: 'space-around',
width: '100%',
marginTop: 10,
},
modalBackButton: {
backgroundColor: '#FF4136', // Red color
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 8,
flex: 1,
marginRight: 10,
alignItems: 'center',
},
modalSubmitButton: {
backgroundColor: '#2ECC40', // Green color
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 8,
flex: 1,
marginLeft: 10,
alignItems: 'center',
},

centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  commentInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});

export default styles;