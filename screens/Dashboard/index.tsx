import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ColorPropType,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";

import {
  dummyData,
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
} from "../../constants";
import React, { useState } from "react";
import PriceAlert from "../../components/PriceAlert";
import TransactionHistory from "../../components/TransactionHistory";
import { StatusBar } from "expo-status-bar";

export default function Dashboard({
  navigation,
}: RootTabScreenProps<"Dashboard">) {
  const [trending, setTrending] = useState(dummyData.trendingCurrencies);
  const [transactionHistory, setTransactionHistory] = useState(
    dummyData.transactionHistory
  );

  function renderHeader() {
    const renderItem = ({ item, index }: any) => {
      return (
        <TouchableOpacity
          style={{
            width: 180,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            elevation: 5,
            marginBottom: 2,
          }}
          onPress={() => {
            navigation.navigate("Detalhes", item);
          }}
        >
          {/* Curency */}
          <View
            style={{ flexDirection: "row", backgroundColor: "transparent" }}
          >
            <View style={{ backgroundColor: "transparent" }}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={{
                  marginTop: 5,
                  width: 25,
                  height: 25,
                }}
              />
            </View>
            <View
              style={{ marginLeft: SIZES.base, backgroundColor: "transparent" }}
            >
              <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                {item.code}
              </Text>
            </View>
          </View>

          <View
            style={{ marginTop: SIZES.radius, backgroundColor: "transparent" }}
          >
            <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>
              ${item.amount}
            </Text>
            <Text
              style={{ color: item.type == "I" ? COLORS.green : COLORS.red }}
            >
              {item.changes}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          width: "100%",
          height: 290,
          elevation: 2,
        }}
      >
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* Header Bar */}
          <View
            style={{
              backgroundColor: "transparent",
              marginTop: SIZES.padding * 2,
              width: "100%",
              alignItems: "flex-end",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {}}
            >
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{ flex: 1 }}
              ></Image>
            </TouchableOpacity>
          </View>

          {/* Balance */}
          <View
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: "transparent",
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              Your Portifolio Balance
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "transparent",
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.h1,
              }}
            >
              ${dummyData.portfolio.balance}
            </Text>
            <Text
              style={{
                backgroundColor: "transparent",
                color: COLORS.white,
                ...FONTS.body5,
              }}
            >
              {dummyData.portfolio.changes} Last 24 hours
            </Text>
          </View>

          {/* Trending */}
          <View
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              bottom: "-30%",
            }}
          >
            <Text
              onPress={() => {
                console.log(trending);
              }}
              style={{
                marginLeft: SIZES.padding,
                color: COLORS.white,
                ...FONTS.h2,
                fontWeight: "bold",
              }}
            >
              Trending
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: SIZES.base }}
              data={trending}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            ></FlatList>
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderAlert() {
    return <PriceAlert />;
  }

  function renderNotice() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.secondary,
          elevation: 5,
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h3, fontWeight: "bold" }}>
          Investing Safety
        </Text>
        <Text
          style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          It's very difficult to time an investiment, especially when the market
          is volatile. Learn how to use dolar cost averaging to your advantage.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: SIZES.base,
          }}
          onPress={() => {}}
        >
          <Text
            style={{
              textDecorationLine: "underline",
              color: COLORS.green,
              ...FONTS.h3,
            }}
          >
            Learn More
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTransacionHistory() {
    return (
      <TransactionHistory
        customContainerStyle={{ ...styles }}
        history={transactionHistory}
      />
    );
  }

  return (
    <ScrollView>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <View
        style={{ flex: 1, paddingBottom: 130, backgroundColor: "transparent" }}
      >
        {renderHeader()}
        {renderAlert()}
        {renderNotice()}
        {renderTransacionHistory()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
