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
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
} from "victory-native";

import VictoryCustomTheme from "../../constants/VictoryCustomTheme";
import { StatusBar } from "expo-status-bar";
import PriceAlert from "../../components/PriceAlert";

export default function Detalhes({ route, navigation }: any) {
  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const scrollX = new Animated.Value(0);
  const numberOfCharts = [1, 2, 3];
  const [chartOptions, setChartOptions] = useState(dummyData.chartOptions);
  const [selectedOptions, setSelectedOptions] = useState(chartOptions[0]);

  useEffect(() => {
    const currency = route.params;
    setSelectedCurrency(currency);
  }, []);

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30, marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {numberOfCharts.map((item, index): any => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  opacity: opacity,
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderChart = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingBottom: 20,
          marginHorizontal: SIZES.radius,
          alignItems: "center",
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          elevation: 5,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <View style={{ flex: 1 }}>
            <CurrencyLabel
              icon={selectedCurrency?.image}
              currency={selectedCurrency?.currency}
              code={selectedCurrency?.code}
            />
          </View>

          <View>
            <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>
              {selectedCurrency?.amount}
            </Text>
            <Text
              style={{
                color:
                  selectedCurrency?.type === "I" ? COLORS.green : COLORS.red,
                ...FONTS.body3,
              }}
            >
              {selectedCurrency?.changes}
            </Text>
          </View>
        </View>

        {/* Chart */}
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={"center"}
          snapToInterval={SIZES.width - 40}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        >
          {numberOfCharts.map((item, index) => (
            <View
              key={`chart-${index}`}
              style={{ marginLeft: index == 0 ? SIZES.base : 0 }}
            >
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <VictoryChart
                  theme={VictoryCustomTheme}
                  height={220}
                  width={SIZES.width - 40}
                >
                  <VictoryLine
                    style={{
                      data: {
                        stroke: COLORS.secondary,
                      },
                      parent: {
                        border: "1px solid #ccc",
                      },
                    }}
                    data={selectedCurrency?.chartData}
                    categories={{
                      x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                      y: ["15", "30", "45"],
                    }}
                  />
                  <VictoryScatter
                    data={selectedCurrency?.chartData}
                    size={7}
                    style={{ data: { fill: COLORS.secondary } }}
                  />
                  <VictoryAxis style={{ grid: { stroke: "transparent" } }} />
                  <VictoryAxis
                    dependentAxis
                    style={{
                      axis: { stroke: "transparent" },
                      grid: { stroke: "gray" },
                    }}
                  />
                </VictoryChart>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        {/* Options */}
        <View
          style={{
            width: "100%",
            paddingHorizontal: SIZES.padding,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {chartOptions.map((option) => {
            return (
              <TouchableOpacity
                key={`option-${option.id}`}
                style={{
                  width: 60,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                  backgroundColor:
                    selectedOptions.id == option.id
                      ? COLORS.primary
                      : COLORS.lightGray,
                  padding: 2,
                }}
                onPress={() => {
                  setSelectedOptions(option);
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ color: COLORS.white, ...FONTS.h4 }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Dots */}
        {renderDots()}
      </View>
    );
  };

  const renderBuy = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          padding: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          elevation: 5,
          ...styles,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: SIZES.radius,
          }}
        >
          {/* Currency */}
          <View style={{ flex: 1 }}>
            <CurrencyLabel
              icon={selectedCurrency?.image}
              currency={`${selectedCurrency?.currency} Wallet`}
              code={selectedCurrency?.code}
            />
          </View>

          {/* Amount */}
          <View style={{ marginRight: SIZES.base }}>
            <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>
              $ {selectedCurrency?.wallet.value}
            </Text>
            <Text
              style={{ textAlign: "right", color: COLORS.gray, ...FONTS.body4 }}
            >
              {selectedCurrency?.wallet.crypto}
              {selectedCurrency?.code}
            </Text>
          </View>
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
          onPress={() => {
            navigation.navigate("Transacoes", selectedCurrency);
          }}
        >
          <Text numberOfLines={1} style={{ color: COLORS.white, ...FONTS.h3 }}>
            Buy
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAbout = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          elevation: 5,
        }}
      >
        <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>
          About {selectedCurrency?.currency}
        </Text>
        <Text
          style={{
            marginTop: SIZES.base,
            ...FONTS.body4,
            lineHeight: 18,
            textAlign: "justify",
          }}
        >
          {selectedCurrency?.description}
        </Text>
      </View>
    );
  };

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
          {renderChart()}
          {renderBuy()}
          {renderAbout()}
          <PriceAlert
            customContainerStyle={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.radius,
            }}
          />
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
