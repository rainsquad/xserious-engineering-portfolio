// Default project catalog data (seeded from WhatsApp Business catalog)
export const defaultProjects = [
  {
    id: "proj-001",
    title: "Mitsubishi Fuso Fighter SH145",
    category: "vehicle",
    tags: ["PCB Repair", "Diagnostics", "Vehicle Electronics"],
    description: "No power issue — Fully recovered PCB and testing same. Complete electronic diagnosis and PCB board recovery for Mitsubishi Fuso Fighter SH145 heavy commercial vehicle.",
    details: [
      "Full electrical diagnostics performed",
      "PCB board fully recovered and restored",
      "Post-repair testing and validation",
      "Zero power issue resolved successfully"
    ],
    image: null,
    featured: true,
    date: "2024-03-15"
  },
  {
    id: "proj-002",
    title: "Industrial Air Compressor 500L",
    category: "mechanical",
    tags: ["Overhauling", "Shaft Modification", "Industrial"],
    description: "Full overhauling of 500L industrial air compressor. Replacing crankshaft and related components. Precision shaft modification to factory specifications.",
    details: [
      "Complete compressor overhauling",
      "Crankshaft replacement",
      "Shaft modification to spec",
      "Full system pressure testing"
    ],
    image: null,
    featured: true,
    date: "2024-02-20"
  },
  {
    id: "proj-003",
    title: "Carburettor Full Restoration",
    category: "vehicle",
    tags: ["Restoration", "Fuel System", "Calibration"],
    description: "Complete carburettor restoration service. Fuel mixer calibration, full line clean-up, packing set replacement, and precision tuning for optimal performance.",
    details: [
      "Full restoration of carburettor assembly",
      "Fuel mixer calibration",
      "Complete line clean-up",
      "Packing set and gasket replacement"
    ],
    image: null,
    featured: false,
    date: "2024-01-10"
  },
  {
    id: "proj-004",
    title: "100kVa Genset Commissioning",
    category: "generator",
    tags: ["Commissioning", "Load Testing", "100kVa"],
    description: "100kVa genset commissioning and full load testing. Complete electrical validation and performance certification for industrial generator installation.",
    details: [
      "Full commissioning procedure executed",
      "Load testing at rated capacity",
      "Power quality measurement and logging",
      "Handover documentation provided"
    ],
    image: null,
    featured: true,
    date: "2024-03-01"
  },
  {
    id: "proj-005",
    title: "Kia Sportage Power Shutter Switch",
    category: "vehicle",
    tags: ["Electrical Repair", "Kia", "Switch Repair"],
    description: "Kia Sportage power shutter switch diagnosis and repair. Full electrical testing, switch mechanism restoration, and functional validation.",
    details: [
      "Electrical fault diagnosis",
      "Switch mechanism repair",
      "Wiring inspection and repair",
      "Full functional testing"
    ],
    image: null,
    featured: false,
    date: "2023-12-15"
  },
  {
    id: "proj-006",
    title: "Engine Overhauling",
    category: "vehicle",
    tags: ["Engine Overhaul", "Mechanical Works", "Full Service"],
    description: "Complete engine overhauling service covering any kind of mechanical works. From piston ring replacement to full engine rebuild with precision machining.",
    details: [
      "Complete engine teardown",
      "Component inspection and measurement",
      "Worn parts replacement",
      "Assembly and run-in procedure"
    ],
    image: null,
    featured: false,
    date: "2024-02-05"
  },
  {
    id: "proj-007",
    title: "Full Vehicle Restoration – Tinkering & Painting",
    category: "vehicle",
    tags: ["Restoration", "Body Work", "Painting", "Electrical"],
    description: "Complete vehicle body restoration including tinkering, painting, and full electrical repairing. Bringing vehicles back to showroom condition.",
    details: [
      "Full body tinkering and panel work",
      "Surface preparation and painting",
      "Electrical system restoration",
      "Final inspection and detailing"
    ],
    image: null,
    featured: true,
    date: "2024-01-25"
  },
  {
    id: "proj-008",
    title: "DFSK Glory 380 – EPS System Fix",
    category: "vehicle",
    tags: ["EPS", "Electronics", "DFSK", "Diagnostics"],
    description: "DFSK Glory 380 EPS (Electric Power Steering) system error diagnosis and fixing. Full ECU scanning, fault code resolution, and steering system calibration.",
    details: [
      "EPS system error diagnosis",
      "ECU scan and fault code analysis",
      "EPS motor and sensor inspection",
      "System calibration and road test"
    ],
    image: null,
    featured: false,
    date: "2024-03-10"
  },
  {
    id: "proj-009",
    title: "250kVa Generator Service with Alternator",
    category: "generator",
    tags: ["Generator Service", "Alternator", "250kVa"],
    description: "Comprehensive 250kVa generator service including alternator side maintenance. Full electrical and mechanical service with load testing and performance certification.",
    details: [
      "Complete generator mechanical service",
      "Alternator inspection and servicing",
      "Load bank testing",
      "Performance report issued"
    ],
    image: null,
    featured: true,
    date: "2024-03-20",
    price: "LKR 265,000"
  }
];

// Storage utilities
const STORAGE_KEY = "xserious_projects";

export const getProjects = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return defaultProjects;
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return true;
  } catch (e) {
    return false;
  }
};

export const addProject = (project) => {
  const projects = getProjects();
  const newProject = {
    ...project,
    id: `proj-${Date.now()}`,
    date: new Date().toISOString().split("T")[0]
  };
  const updated = [newProject, ...projects];
  saveProjects(updated);
  return updated;
};

export const updateProject = (id, updates) => {
  const projects = getProjects();
  const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p);
  saveProjects(updated);
  return updated;
};

export const deleteProject = (id) => {
  const projects = getProjects();
  const updated = projects.filter(p => p.id !== id);
  saveProjects(updated);
  return updated;
};

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "generator", label: "Generator Works" },
  { id: "vehicle", label: "Vehicle Engineering" },
  { id: "mechanical", label: "Mechanical Works" },
  { id: "electrical", label: "Electrical & Electronic" },
  { id: "panels", label: "Meter Panels" }
];
