import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  CartItem,
  computeSubtotal,
  computeTax,
  computeTotal,
  formatPrice,
} from "../lib/cart";

type Props = {
  items: CartItem[];
  onDone: () => void;
};

export default function CheckoutScreen({ items, onDone }: Props) {
  const subtotal = computeSubtotal(items);
  const tax = computeTax(subtotal);
  const total = computeTotal(subtotal, tax);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Order confirmed</Text>
      <Text style={styles.subheading}>Thanks for stopping by.</Text>

      <View style={styles.summary}>
        {items.map((ci) => (
          <View key={ci.item.id} style={styles.line}>
            <Text style={styles.lineLabel}>
              {ci.item.name} × {ci.quantity}
            </Text>
            <Text style={styles.lineValue}>
              {formatPrice(ci.item.price * ci.quantity)}
            </Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.line}>
          <Text style={styles.lineLabel}>Subtotal</Text>
          <Text style={styles.lineValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.lineLabel}>Tax</Text>
          <Text style={styles.lineValue}>{formatPrice(tax)}</Text>
        </View>
        <View style={styles.line}>
          <Text style={[styles.lineLabel, styles.bold]}>Total</Text>
          <Text style={[styles.lineValue, styles.bold]}>{formatPrice(total)}</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={onDone}>
        <Text style={styles.buttonLabel}>Back to menu</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
  },
  summary: {
    borderRadius: 12,
    backgroundColor: "#fafaf7",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    gap: 8,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lineLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  lineValue: {
    fontSize: 14,
    color: "#1f2937",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 6,
  },
  bold: {
    fontWeight: "700",
    color: "#1f2937",
    fontSize: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#6f4e37",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
