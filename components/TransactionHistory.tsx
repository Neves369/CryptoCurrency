import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";

const TransactionHistory = ({ customContainerStyle, history }: any) => {
  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SIZES.base,
        }}
        onPress={() => {}}
      >
        <Image
          source={icons.transaction}
          style={{ width: 30, height: 30, tintColor: COLORS.primary }}
        />
        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>
            {item.description}
          </Text>
          <Text style={{ color: COLORS.gray, ...FONTS.h4 }}>{item.date}</Text>
        </View>
        <View
          style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
        >
          <Text
            style={{
              color: item.type == "B" ? COLORS.green : COLORS.black,
              ...FONTS.h3,
            }}
          >
            {item.amount} {item.currency}
          </Text>
          <Image
            source={icons.right_arrow}
            style={{ width: 20, height: 20, tintColor: COLORS.gray }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
        elevation: 5,
      }}
    >
      <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>
        Transaction History
      </Text>
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.radius }}
        scrollEnabled={false}
        data={history}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.lightGray,
              }}
            ></View>
          );
        }}
      />
    </View>
  );
};

export default TransactionHistory;
