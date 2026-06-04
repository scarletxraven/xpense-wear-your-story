import type { Dispatch, SetStateAction } from "react";

export interface AddressData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  phone: string;
}

interface Props {
  value: AddressData;
  onChange: Dispatch<SetStateAction<AddressData>>;
}

const Field = ({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      {label}
    </span>
    <input
      {...rest}
      className="mt-2 w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary"
    />
  </label>
);

export function AddressForm({ value, onChange }: Props) {
  const set =
    <K extends keyof AddressData>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange((v) => ({ ...v, [k]: e.target.value }));

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-xl font-semibold">Contact</h2>
        <div className="mt-4">
          <Field label="Email" type="email" required value={value.email} onChange={set("email")} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">Shipping address</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="First name" required value={value.firstName} onChange={set("firstName")} />
          <Field label="Last name" required value={value.lastName} onChange={set("lastName")} />
          <div className="md:col-span-2">
            <Field label="Street address" required value={value.address} onChange={set("address")} />
          </div>
          <Field label="City" required value={value.city} onChange={set("city")} />
          <Field label="Postal code" required value={value.postal} onChange={set("postal")} />
          <Field label="Country" required value={value.country} onChange={set("country")} />
          <Field label="Phone" type="tel" value={value.phone} onChange={set("phone")} />
        </div>
      </section>
    </div>
  );
}
