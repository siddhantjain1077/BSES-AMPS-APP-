import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { useTheme } from '../screens/ThemeContext';
import getStyles from '../screens/DetailScreen.styling';

const CollapsibleCard = ({ title, children, initialExpanded = true }) => {
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
        <Text style={[styles.toggleIcon, { color: colors.text }]}>
          {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {expanded && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};

export default CollapsibleCard;
