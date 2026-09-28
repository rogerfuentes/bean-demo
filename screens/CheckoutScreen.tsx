import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  CartItem,
  computeSubtotal,
  computeTax,
  computeTotal,
  formatPrice,
} from "../lib/cart";

const NOTE_MAX_LENGTH = 140;

type Props = {
  items: CartItem[];
  note: string;
  onNoteChange: (note: string) => void;
  onBack: () => void;
  onDone: () => void;
};

export default function CheckoutScreen({
  items,
  note,
  onNoteChange,
  onBack,
  onDone,
}: Props) {
  const [step, setStep] = useState<"review" | "confirmation">("review");

  const subtotal = computeSubtotal(items);
  const tax = computeTax(subtotal);
  const total = computeTotal(subtotal, tax);
  const trimmedNote = note.trim();

  const summaryLines = (
    <>
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
    </>
  );

  if (step === "review") {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Review order</Text>
        <Text style={styles.subheading}>Check your items before placing.</Text>

        <View style={styles.summary}>{summaryLines}</View>

        <Text style={styles.inputLabel}>Note for the barista (optional)</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={onNoteChange}
          maxLength={NOTE_MAX_LENGTH}
          placeholder="e.g. extra hot, no sugar"
          placeholderTextColor="#9ca3af"
          selectionColor="#6f4e37"
          returnKeyType="done"
        />
        <Text style={styles.counter}>
          {note.length} / {NOTE_MAX_LENGTH}
        </Text>

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, styles.secondaryButton, styles.actionButton]}
            onPress={onBack}
          >
            <Text style={[styles.buttonLabel, styles.secondaryButtonLabel]}>
              Back
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.actionButton]}
            onPress={() => setStep("confirmation")}
          >
            <Text style={styles.buttonLabel}>Place order</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Order confirmed</Text>
      <Text style={styles.subheading}>Thanks for stopping by.</Text>

      <View style={styles.summary}>
        {summaryLines}
        {trimmedNote.length > 0 && (
          <>
            <View style={styles.divider} />
            <View style={styles.noteBlock}>
              <Text style={styles.lineLabel}>Note</Text>
              <Text style={styles.noteText}>{trimmedNote}</Text>
            </View>
          </>
        )}
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
  noteBlock: {
    gap: 4,
  },
  noteText: {
    fontSize: 14,
    color: "#1f2937",
    fontStyle: "italic",
  },
  inputLabel: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5ded6",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1f2937",
  },
  counter: {
    marginTop: 6,
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#9ca3af",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
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
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6f4e37",
  },
  secondaryButtonLabel: {
    color: "#6f4e37",
  },
});
