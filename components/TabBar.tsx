import { Pressable, StyleSheet, Text, View } from "react-native";

export type Screen = "menu" | "cart" | "checkout";

type Props = {
  current: Screen;
  onChange: (s: Screen) => void;
  cartCount: number;
};

export default function TabBar({ current, onChange, cartCount }: Props) {
  return (
    <View style={styles.row}>
      <Tab label="Menu" active={current === "menu"} onPress={() => onChange("menu")} />
      <Tab
        label={cartCount > 0 ? `Cart (${cartCount})` : "Cart"}
        active={current === "cart"}
        onPress={() => onChange("cart")}
      />
    </View>
  );
}

function Tab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },
  tabActive: {
    backgroundColor: "#6f4e37",
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  tabLabelActive: {
    color: "#fff",
  },
});
