import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import Navigation from "../navigation";

const HeaderBar = ({ right }: any) => {
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: SIZES.padding, flexDirection: "row" }}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={icons.back_arrow}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.gray,
            }}
          />
          {/* <Text style={{ marginLeft: SIZES.base, ...FONTS.h2 }}>back</Text> */}
        </TouchableOpacity>
      </View>
      {right && (
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity>
            <Image
              source={icons.star}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderBar;
