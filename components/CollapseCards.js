import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useTheme } from '../screens/ThemeContext';
import getStyles from '../screens/DetailScreen.styling';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export const CollapsibleCard = ({ title, children, initialExpanded = true }) => {
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

export const KeyValue = ({ label, value, color }) => {
  const { colors, isDark } = useTheme();
  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: color ?? colors.text }]}>{label}</Text>
      <Text style={[styles.value, { color: color ?? colors.text }]}>{value}</Text>
    </View>
  );
};
