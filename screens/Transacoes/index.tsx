import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrencyLabel from "../../components/CurrencyLabel";
import EditScreenInfo from "../../components/EditScreenInfo";
import HeaderBar from "../../components/HeaderBar";
import { Text, View } from "../../components/Themed";
import { COLORS, SIZES, FONTS, dummyData } from "../../constants";

import { StatusBar } from "expo-status-bar";
import TransactionHistory from "../../components/TransactionHistory";

export default function Transacoes({ route, navigation }: any) {
  const [selectedCurrency, setSelectedCurrency] = useState<any>();

  useEffect(() => {
    const currency = route.params;
    setSelectedCurrency(currency);
  }, []);

  const renderTrade = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          elevation: 5,
        }}
      >
        <CurrencyLabel
          icon={selectedCurrency?.image}
          currency={selectedCurrency?.currency}
          code={selectedCurrency?.code}
        />
        <View
          style={{
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding * 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ ...FONTS.h2 }}>
            {selectedCurrency?.wallet.crypto} {selectedCurrency?.code}
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
            {selectedCurrency?.wallet.value}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: COLORS.green,
            padding: 2,
          }}
          onPress={() => {}}
        >
          <Text numberOfLines={1} style={{ color: COLORS.white, ...FONTS.h3 }}>
            Trade
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  function renderTransacionHistory() {
    return (
      <TransactionHistory
        customContainerStyle={{ ...styles }}
        history={selectedCurrency?.transactionHistory}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <HeaderBar right={true} />
      <ScrollView style={{ paddingBottom: SIZES.padding }}>
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.padding,
            backgroundColor: "transparent",
          }}
        >
          {renderTrade()}
          {renderTransacionHistory()}
        </View>
      </ScrollView>
    </SafeAreaView>
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
