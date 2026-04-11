import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  CartItem,
  computeSubtotal,
  computeTax,
  computeTotal,
  formatPrice,
} from "../lib/cart";
import CartRow from "../components/CartRow";

type Props = {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
};

export default function CartScreen({ items, onRemove, onCheckout }: Props) {
  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty. Head back to the menu.</Text>
      </View>
    );
  }

  const subtotal = computeSubtotal(items);
  const tax = computeTax(subtotal);
  const total = computeTotal(subtotal, tax);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(ci) => ci.item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <CartRow item={item} onRemove={() => onRemove(item.item.id)} />
        )}
      />
      <View style={styles.footer}>
        <PriceLine label="Subtotal" value={formatPrice(subtotal)} />
        <PriceLine label="Tax" value={formatPrice(tax)} />
        <PriceLine label="Total" value={formatPrice(total)} bold />
        <Pressable style={styles.button} onPress={onCheckout}>
          <Text style={styles.buttonLabel}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PriceLine({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.priceRow}>
      <Text style={[styles.priceLabel, bold && styles.priceBold]}>{label}</Text>
      <Text style={[styles.priceValue, bold && styles.priceBold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 15,
  },
  list: {
    padding: 16,
  },
  sep: {
    height: 8,
  },
  footer: {
    padding: 16,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    gap: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  priceValue: {
    fontSize: 14,
    color: "#1f2937",
  },
  priceBold: {
    fontWeight: "700",
    color: "#1f2937",
    fontSize: 16,
  },
  button: {
    marginTop: 12,
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
