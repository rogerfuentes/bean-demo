import { Pressable, StyleSheet, Text, View } from "react-native";
import { MenuItem } from "../lib/menu";
import { formatPrice } from "../lib/cart";

type Props = {
  item: MenuItem;
  onAdd: () => void;
};

export default function MenuItemCard({ item, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Pressable onPress={onAdd} style={styles.button}>
        <Text style={styles.buttonLabel}>{formatPrice(item.price)}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fafaf7",
    borderWidth: 1,
    borderColor: "#eee",
    gap: 12,
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#6b7280",
  },
  button: {
    backgroundColor: "#6f4e37",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
