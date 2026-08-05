import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";import { useApp } from "../context/AppContext";

export default function Login() {
    const { login } = useApp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Fake delay
        await new Promise((r) => setTimeout(r, 800));

        setIsLoading(false);
        login(email);
        navigate("/scan");
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
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in…" : "Sign in"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground text-center">
                {/* Placeholder for future links (forgot password, etc.) */}
            </CardFooter>
        </Card>
    );
}
