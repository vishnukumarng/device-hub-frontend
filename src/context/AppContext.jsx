import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AppContext = createContext();

const INITIAL_DEVICES = [
  {
    id: "dev-1",
    name: "iPhone 15 Pro",
    category: "SMARTPHONE",
    status: "AVAILABLE",
    serialNumber: "IP15P-8921",
    location: "Bay A - Shelf 2",
    specs: [
      "Apple A17 Pro Chip",
      "128GB Storage",
      "Super Retina XDR Display",
      "USB-C Port",
    ],
  },
  {
    id: "dev-2",
    name: 'MacBook Pro 16"',
    category: "LAPTOP",
    status: "IN_USE",
    serialNumber: "MBP16-4309",
    location: "Lab 2 - Desk 4",
    specs: [
      "Apple M3 Max Chip",
      "32GB Unified Memory",
      "1TB SSD Storage",
      "Liquid Retina XDR",
    ],
  },
  {
    id: "dev-3",
    name: 'iPad Pro 12.9"',
    category: "TABLET",
    status: "AVAILABLE",
    serialNumber: "IPP12-1102",
    location: "Bay B - Shelf 1",
    specs: [
      "Apple M2 Chip",
      "256GB Storage",
      "Wi-Fi + Cellular",
      "Thunderbolt Port",
    ],
  },
  {
    id: "dev-4",
    name: "Google Pixel 8 Pro",
    category: "SMARTPHONE",
    status: "IN_USE",
    serialNumber: "GP8P-9988",
    location: "Bay A - Shelf 3",
    specs: [
      "Google Tensor G3",
      "12GB RAM",
      "128GB Storage",
      "5x Telephoto Camera",
    ],
  },
  {
    id: "dev-5",
    name: "ThinkPad X1 Carbon Gen 11",
    category: "LAPTOP",
    status: "MAINTENANCE",
    serialNumber: "TPX1-0921",
    location: "IT Support Office",
    specs: [
      "Intel Core i7-1365U",
      "16GB LPDDR5 RAM",
      "512GB PCIe Gen 4 SSD",
      "Intel Iris Xe",
    ],
  },
  {
    id: "dev-6",
    name: "Samsung Galaxy S24 Ultra",
    category: "SMARTPHONE",
    status: "AVAILABLE",
    serialNumber: "GS24U-7766",
    location: "Bay A - Shelf 1",
    specs: [
      "Snapdragon 8 Gen 3",
      "12GB RAM",
      "256GB Storage",
      "Dynamic AMOLED 2X",
    ],
  },
];

export function AppProvider({ children }) {
  const [devices, setDevices] = useState(INITIAL_DEVICES);

  const [checkouts, setCheckouts] = useState([
    {
      id: "chk-1",
      deviceId: "dev-2",
      device: INITIAL_DEVICES[1],
      type: "CHECKOUT",
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      expectedReturnTime: new Date(
        Date.now() + 4 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "chk-2",
      deviceId: "dev-4",
      device: INITIAL_DEVICES[3],
      type: "CHECKOUT",
      startTime: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      expectedReturnTime: new Date(
        Date.now() - 2 * 60 * 60 * 1000,
      ).toISOString(), // Overdue
    },
  ]);

  const [waitlist, setWaitlist] = useState([
    {
      id: "wt-1",
      deviceId: "dev-2",
      device: INITIAL_DEVICES[1],
      status: "PENDING",
      position: 1,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "wt-2",
      deviceId: "dev-5",
      device: INITIAL_DEVICES[4],
      status: "NOTIFIED",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  // Handle local storage for auth state to match standard routing redirects
  // useEffect(() => {
  //   if (currentUser) {
  //     localStorage.setItem("isAuthenticated", "true");
  //   } else {
  //     localStorage.removeItem("isAuthenticated");
  //   }
  // }, [currentUser]);

  // // Auth Operations
  // const login = (email) => {
  //   setCurrentUser({
  //     name: email
  //       .split("@")[0]
  //       .split(".")
  //       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  //       .join(" "),
  //     email: email,
  //   });
  //   toast.success("Successfully signed in");
  // };

  // const logout = () => {
  //   setCurrentUser(null);
  //   toast.success("Successfully signed out");
  // };

  // Device Operations
  const checkoutDevice = (deviceId) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, status: "IN_USE" } : d)),
    );

    const device = devices.find((d) => d.id === deviceId);
    const newCheckout = {
      id: `chk-${Date.now()}`,
      deviceId,
      device,
      type: "CHECKOUT",
      startTime: new Date().toISOString(),
      expectedReturnTime: new Date(
        Date.now() + 4 * 60 * 60 * 1000,
      ).toISOString(), // 4h duration
    };

    setCheckouts((prev) => [newCheckout, ...prev]);
    // If user was on waitlist for this, remove them
    setWaitlist((prev) => prev.filter((w) => w.deviceId !== deviceId));
    toast.success(`${device.name} checked out successfully`);
  };

  const reserveDevice = (deviceId, startTimeString) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId ? { ...d, status: "RESERVATION" } : d,
      ),
    );

    const device = devices.find((d) => d.id === deviceId);
    const newReservation = {
      id: `chk-${Date.now()}`,
      deviceId,
      device,
      type: "RESERVATION",
      startTime:
        startTimeString || new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      expectedReturnTime: new Date(
        Date.now() + 2 * 60 * 60 * 1000,
      ).toISOString(),
    };

    setCheckouts((prev) => [newReservation, ...prev]);
    toast.success(`${device.name} reserved successfully`);
  };

  const joinWaitlist = (deviceId) => {
    const device = devices.find((d) => d.id === deviceId);
    const count = waitlist.filter((w) => w.deviceId === deviceId).length;

    const newWaitlist = {
      id: `wt-${Date.now()}`,
      deviceId,
      device,
      status: "PENDING",
      position: count + 1,
      createdAt: new Date().toISOString(),
    };

    setWaitlist((prev) => [...prev, newWaitlist]);
    toast.success(`Joined waitlist for ${device.name}`);
  };

  const returnDevice = (checkout) => {
    const { deviceId, device } = checkout;

    // Check if anyone is waiting
    const waitingIndex = waitlist.findIndex(
      (w) => w.deviceId === deviceId && w.status === "PENDING",
    );

    setDevices((prev) => {
      let nextStatus = "AVAILABLE";
      if (waitingIndex !== -1) {
        nextStatus = "AVAILABLE"; // Actually waitlist will notify, so device status transitions or stays available
      }
      return prev.map((d) =>
        d.id === deviceId ? { ...d, status: nextStatus } : d,
      );
    });

    setCheckouts((prev) => prev.filter((c) => c.id !== checkout.id));

    // Update waitlist entry if there is one
    if (waitingIndex !== -1) {
      setWaitlist((prev) =>
        prev.map((w, index) =>
          index === waitingIndex ? { ...w, status: "NOTIFIED" } : w,
        ),
      );
      toast.success(`${device.name} returned. Notified waitlisted user.`);
    } else {
      toast.success(`${device.name} returned successfully`);
    }
  };

  const extendCheckout = (checkout, extraMinutes) => {
    setCheckouts((prev) =>
      prev.map((c) => {
        if (c.id === checkout.id) {
          const newTime = new Date(
            new Date(c.expectedReturnTime).getTime() + extraMinutes * 60 * 1000,
          ).toISOString();
          return { ...c, expectedReturnTime: newTime };
        }
        return c;
      }),
    );
    toast.success(`Checkout extended by ${extraMinutes} minutes`);
  };

  const cancelReservation = (checkout) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === checkout.deviceId ? { ...d, status: "AVAILABLE" } : d,
      ),
    );
    setCheckouts((prev) => prev.filter((c) => c.id !== checkout.id));
    toast.success(`Reservation for ${checkout.device.name} cancelled`);
  };

  const leaveWaitlist = (entry) => {
    setWaitlist((prev) => prev.filter((w) => w.id !== entry.id));
    toast.success(`Left waitlist for ${entry.device.name}`);
  };

  const claimWaitlistDevice = (entry) => {
    checkoutDevice(entry.deviceId);
  };

  return (
    <AppContext.Provider
      value={{
        // currentUser,
        devices,
        checkouts,
        waitlist,
        // login,
        // logout,
        checkoutDevice,
        reserveDevice,
        joinWaitlist,
        returnDevice,
        extendCheckout,
        cancelReservation,
        leaveWaitlist,
        claimWaitlistDevice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
