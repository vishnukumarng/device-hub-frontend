import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/device/SearchBar";
import DeviceFilter from "../components/device/DeviceFilter";
import DeviceList from "../components/device/DeviceList";
import { useApp } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { getalldeviceThunk } from "../store/device/deviceThunk";

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { devices } = useSelector((state) => state.device);

  console.log("devices", devices);

  // Live filtering of devices
  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      // 1. Search Query filter
      const matchesSearch =
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.serial_no.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category filter
      const matchesCategory =
        selectedCategory === "ALL" ||
        device.category.toUpperCase() === selectedCategory;

      // 3. Status filter
      const matchesStatus =
        selectedStatus === "ALL" ||
        device.status.toUpperCase() === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [devices, searchQuery, selectedCategory, selectedStatus]);

  const handleSelectDevice = (device) => {
    // Navigate to device details
    navigate(`/devices/${device.id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Simulate minor visual loading when typing to make it feel reactive
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    dispatch(getalldeviceThunk());
  }, []);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Search Devices"
        description="Browse company devices, inspect availability status, or place reservations."
      />

      <div className="space-y-3">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />

        <DeviceFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 250);
          }}
          selectedStatus={selectedStatus}
          onSelectStatus={(stat) => {
            setSelectedStatus(stat);
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 250);
          }}
        />
      </div>

      <div className="pt-2">
        <DeviceList
          devices={filteredDevices}
          isLoading={isLoading}
          onSelectDevice={handleSelectDevice}
        />
      </div>
    </div>
  );
}
