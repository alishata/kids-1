import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CLASSES_FILE = path.join(DATA_DIR, 'classes.json');
const KIDS_FILE = path.join(DATA_DIR, 'kids.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Initialize files if they don't exist
const initFile = (filePath: string, initialData: any) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }
};

initFile(CLASSES_FILE, [
  { id: '1', name: 'فصل النجوم', capacity: 20, teacher: 'أمل الكويتي' },
  { id: '2', name: 'فصل الزهور', capacity: 15, teacher: 'سارة العلي' },
  { id: '3', name: 'فصل العصافير', capacity: 10, teacher: 'فاطمة المطيري' }
]);

initFile(KIDS_FILE, []);

export const db = {
  getClasses: () => {
    const data = fs.readFileSync(CLASSES_FILE, 'utf-8');
    return JSON.parse(data);
  },
  saveClasses: (classes: any[]) => {
    fs.writeFileSync(CLASSES_FILE, JSON.stringify(classes, null, 2));
  },
  getKids: () => {
    const data = fs.readFileSync(KIDS_FILE, 'utf-8');
    return JSON.parse(data);
  },
  saveKids: (kids: any[]) => {
    fs.writeFileSync(KIDS_FILE, JSON.stringify(kids, null, 2));
  }
};
