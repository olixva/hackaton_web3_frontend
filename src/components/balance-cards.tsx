import type { User } from "@/services/userService.service";
import cardSaldo from "@/assets/card_saldo.png";

interface BalanceCardsProps {
  user: User;
}

export function BalanceCards({ user }: BalanceCardsProps) {
  const balanceEuro = user.balance_euro ?? 0;
  const balanceSats = user.balance_satoshis ?? 0;
  const monthlyKwh = user.monthly_usage_kwh || 0;

  const dailyAvgKwh = monthlyKwh / 30;

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 px-4">
      <div
        className="rounded-3xl bg-gradient-to-br from-[#052e16] via-[#065f46] to-[#16a34a] text-white p-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${cardSaldo})` }}
      >
        <p className="text-sm opacity-80">Tu saldo</p>

        <p className="mt-1 text-4xl font-semibold">{balanceEuro.toFixed(4)}€</p>

        <p className="mt-4 text-xs opacity-80">Saldo en satoshis:</p>

        <p className="text-lg font-medium">
          {balanceSats.toLocaleString("es-ES")} sats
        </p>
      </div>

      <div className="rounded-3xl bg-[#85d781] text-white p-5">
        <p className="text-sm opacity-90">Este mes</p>

        <p className="mt-1 text-4xl font-semibold">
          {monthlyKwh.toFixed(0)}
          <span className="text-2xl align-top ml-1">kWh</span>
        </p>

        <p className="mt-4 text-xs opacity-90">Consumo medio diario</p>

        <p className="text-lg font-medium">{dailyAvgKwh.toFixed(1)} kWh</p>
      </div>
    </div>
  );
}
