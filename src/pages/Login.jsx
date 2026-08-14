import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/auth/authThunk";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login: contextLogin } = useApp();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginThunk({ email, password })).unwrap();
      toast.success("Login Successful");
      navigate("/scan", { replace: true });
    } catch (error) {
      toast.error(error?.message || String(error) || "Login failed");
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-col items-center space-y-2">
        {/* Placeholder logo */}
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
          DH
        </div>
        <CardTitle className="text-2xl">DeviceHub</CardTitle>
        <p className="text-sm text-muted-foreground">
          Find and reserve office devices
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </CardContent>
      {/* <CardFooter className="text-xs text-muted-foreground text-center"></CardFooter> */}
    </Card>
  );
}
