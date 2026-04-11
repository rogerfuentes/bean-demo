import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem, formatPrice } from "../lib/cart";

type Props = {
  item: CartItem;
  onRemove: () => void;
};

export default function CartRow({ item, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.body}>
        <Text style={styles.name}>
          {item.item.name} × {item.quantity}
        </Text>
        <Text style={styles.price}>
          {formatPrice(item.item.price * item.quantity)}
        </Text>
      </View>
      <Pressable onPress={onRemove} style={styles.removeButton}>
        <Text style={styles.removeLabel}>Remove</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#fafaf7",
    borderWidth: 1,
    borderColor: "#eee",
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
  },
  price: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },
  removeLabel: {
    fontSize: 12,
    color: "#ef4444",
    fontWeight: "600",
  },
});
