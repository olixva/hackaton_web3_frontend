import type { User } from "@/services/userService.service";
import cardSaldo from "@/assets/card_saldo.png";

// Defines the interface for component props
interface BalanceCardsProps {
  user: User;
}

export function BalanceCards({ user }: BalanceCardsProps) {
  // Extracts balance values in euros and satoshis with default values
  const balanceEuro = user.balance_euro ?? 0;
  const balanceSats = user.balance_satoshis ?? 0;
  // Gets the user's monthly kWh consumption
  const monthlyKwh = user.monthly_usage_kwh || 0;

  // Calculates the daily average consumption by dividing monthly consumption by 30 days
  const dailyAvgKwh = monthlyKwh / 30;

  return (
    // Main container with 2-column grid and spacing between cards
    <div className="mt-6 grid grid-cols-2 gap-4 px-4">
      {/* Balance card in euros and satoshis with green gradient background */}
      <div
        className="rounded-3xl bg-gradient-to-br from-[#052e16] via-[#065f46] to-[#16a34a] text-white p-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${cardSaldo})` }}
      >
        <p className="text-sm opacity-80">Tu saldo</p>

        {/* Displays balance in euros with 4 decimal places */}
        <p className="mt-1 text-4xl font-semibold">{balanceEuro.toFixed(4)}€</p>

        <p className="mt-4 text-xs opacity-80">Saldo en satoshis:</p>

        {/* Displays balance in satoshis with locale formatting */}
        <p className="text-lg font-medium">
          {balanceSats.toLocaleString("es-ES")} sats
        </p>
      </div>

      {/* Monthly consumption card with light green background */}
      <div className="rounded-3xl bg-[#85d781] text-white p-5">
        <p className="text-sm opacity-90">Este mes</p>

        {/* Displays total monthly consumption in kWh */}
        <p className="mt-1 text-4xl font-semibold">
          {monthlyKwh.toFixed(0)}
          <span className="text-2xl align-top ml-1">kWh</span>
        </p>

        <p className="mt-4 text-xs opacity-90">Consumo medio diario</p>

        {/* Displays calculated daily average consumption */}
        <p className="text-lg font-medium">{dailyAvgKwh.toFixed(1)} kWh</p>
      </div>
    </div>
  );
}
