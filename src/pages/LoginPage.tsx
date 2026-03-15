import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [PIN, setPIN] = useState(0);
  const [showPIN, setShowPIN] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validEmail = email.trim();

    if (PIN.toString().length !== 4 || typeof PIN !== "number") {
      console.log('wrong');
    }
    login(validEmail, PIN);
  };

  return (
    <main className="min-h-screen bg-linear-to-r bg-todo-scene px-4 pt-10">
      <div className="mx-auto w-full max-w-xl">
        <Card className="shadow-todo">
          <CardHeader className="space-y-2 pb-2">
            <CardTitle className="bg-linear-to-r from-slate-900 via-blue-900 to-slate-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
              TaskFlow Lite
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Inicia sesi&oacute;n para continuar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label
                className="block text-sm font-semibold uppercase tracking-wide text-slate-700"
                htmlFor="email"
              >
                Correo
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-xl border-slate-300 bg-white/90 text-base shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="tu@email.com"
                autoComplete="email"
                required
              />
              <label
                className="block text-sm font-semibold uppercase tracking-wide text-slate-700"
                htmlFor="PIN"
              >
                PIN
              </label>
              <div className="relative">
                <Input
                  id="PIN"
                  type={showPIN ? "password" : "PIN"}
                  value={PIN}
                  onChange={(event) => setPIN(+event.target.value)}
                  className="h-12 rounded-xl border-slate-300 bg-white/90 pr-12 text-base shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="********"
                  autoComplete="current-PIN"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPIN((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 transition hover:text-slate-700"
                  aria-label={
                    showPIN ? "Ocultar PIN" : "Mostrar PIN"
                  }
                >
                  {showPIN ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button
                  className="bg-todo-topbar transition cursor-pointer"
                  type="submit"
                  size="lg"
                >
                  Ingresar
                </Button>
                <button
                  type="button"
                  className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-slate-800"
                >
                  &iquest;Olvidaste tu PIN?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
