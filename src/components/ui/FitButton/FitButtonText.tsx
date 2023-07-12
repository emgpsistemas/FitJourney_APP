import React from "react";
import { Text } from "react-native";

interface FitButtonTextProps {
  children: React.ReactNode;
}

function FitButtonText({ children }: FitButtonTextProps) {
  return <Text className="flex px-2 font-openBold text-base">{children}</Text>;
}

export default FitButtonText;
