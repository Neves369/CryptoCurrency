import React from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const PriceAlert = ({ customContainerStyle }: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.padding * 4.5,
        marginHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...customContainerStyle,
        ...styles.shadow,
      }}
    >
      <Image
        source={icons.notification_color}
        style={{
          width: 30,
          height: 30,
        }}
      />
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>Set Price Alert</Text>
        <Text style={{ ...FONTS.body4, color: "gray" }}>
          Get notified ypur coins are moving
        </Text>
      </View>
      <Image
        source={icons.right_arrow}
        style={{
          width: 30,
          height: 30,
          tintColor: COLORS.gray,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    elevation: 8,
  },
});

export default PriceAlert;
