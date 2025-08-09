import type { Todo } from '@/store/useTodoStore';

// Helper function to generate random dates
const getRandomDate = (daysFromNow: number, variance: number = 5) => {
    const baseDate = Date.now() + (daysFromNow * 24 * 60 * 60 * 1000);
    const randomOffset = (Math.random() - 0.5) * 2 * variance * 24 * 60 * 60 * 1000;
    return new Date(baseDate + randomOffset);
};

const priorities: ('LOW' | 'MEDIUM' | 'HIGH')[] = ['LOW', 'MEDIUM', 'HIGH'];
const getRandomPriority = () => priorities[Math.floor(Math.random() * priorities.length)];
const getRandomBoolean = () => Math.random() < 0.5;

const todoTasks = [
    "Buy groceries", "Walk the dog", "Read a book", "Finish taxes", "Call mom",
    "Submit assignment", "Renew subscription", "Clean the house", "Water plants", "Pay bills",
    "Schedule dentist appointment", "Update resume", "Learn React", "Exercise for 30 minutes", "Organize closet",
    "Write blog post", "Plan vacation", "Fix leaky faucet", "Backup computer files", "Call insurance company",
    "Study for exam", "Prepare presentation", "Cook dinner", "Do laundry", "Buy birthday gift",
    "Schedule car maintenance", "Review budget", "Practice guitar", "Send thank you cards", "Update LinkedIn profile",
    "Declutter workspace", "Research new laptop", "Book flight tickets", "Meal prep for week", "Visit grandparents",
    "Complete online course", "Fix broken chair", "Organize photo albums", "Plan team meeting", "Buy new shoes",
    "Schedule annual checkup", "Learn Spanish", "Write journal entry", "Clean car", "Update passwords",
    "Research investment options", "Plan birthday party", "Fix garden fence", "Complete tax forms", "Buy winter clothes",
    "Schedule home inspection", "Learn to cook pasta", "Organize digital files", "Plan weekend trip", "Buy plants for garden",
    "Complete project proposal", "Schedule team building", "Fix computer issue", "Plan grocery list", "Buy new books",
    "Schedule oil change", "Learn photography", "Write product review", "Clean garage", "Update emergency contacts",
    "Research new recipes", "Plan family reunion", "Fix door handle", "Complete training module", "Buy workout equipment",
    "Schedule pest control", "Learn meditation", "Write business plan", "Clean basement", "Update insurance policy",
    "Research college courses", "Plan holiday menu", "Fix window blinds", "Complete survey form", "Buy art supplies",
    "Schedule HVAC maintenance", "Learn coding", "Write recommendation letter", "Clean attic", "Update will and testament",
    "Research vacation destinations", "Plan community event", "Fix leaking pipe", "Complete job application", "Buy gardening tools",
    "Schedule chimney cleaning", "Learn new language", "Write thank you email", "Clean refrigerator", "Update contact information",
    "Research home security", "Plan charity event", "Fix squeaky door", "Complete health assessment", "Buy kitchen utensils",
    "Schedule carpet cleaning", "Learn musical instrument", "Write project report", "Clean windows", "Update social media profiles",
    "Research retirement planning", "Plan movie night", "Fix broken light switch", "Complete performance review", "Buy office supplies",
    "Schedule gutter cleaning", "Learn graphic design", "Write grant proposal", "Clean bathroom tiles", "Update emergency kit",
    "Research home improvement", "Plan book club meeting", "Fix loose cabinet door", "Complete expense report", "Buy travel accessories",
    "Schedule tree trimming", "Learn data analysis", "Write marketing copy", "Clean outdoor furniture", "Update backup drives",
    "Research educational programs", "Plan potluck dinner", "Fix creaky floorboard", "Complete safety training", "Buy sports equipment",
    "Schedule pool maintenance", "Learn web development", "Write user manual", "Clean air vents", "Update software licenses",
    "Research health insurance", "Plan game night", "Fix broken doorbell", "Complete compliance training", "Buy home decor",
    "Schedule deck staining", "Learn digital marketing", "Write case study", "Clean light fixtures", "Update inventory records",
    "Research career opportunities", "Plan networking event", "Fix loose handrail", "Complete skills assessment", "Buy pet supplies",
    "Schedule roof inspection", "Learn project management", "Write technical documentation", "Clean outdoor grill", "Update customer database",
    "Research financial planning", "Plan workshop", "Fix broken outlet", "Complete team evaluation", "Buy craft materials",
    "Schedule appliance repair", "Learn database management", "Write policy document", "Clean storage room", "Update vendor contracts",
    "Research wellness programs", "Plan conference call", "Fix wobbly table", "Complete risk assessment", "Buy electronics",
    "Schedule landscaping", "Learn cloud computing", "Write instruction guide", "Clean filing cabinets", "Update employee handbook",
    "Research automation tools", "Plan team lunch", "Fix sticky drawer", "Complete audit checklist", "Buy cleaning supplies",
    "Schedule power washing", "Learn cybersecurity", "Write progress report", "Clean computer keyboard", "Update security protocols",
    "Research productivity apps", "Plan client meeting", "Fix loose screw", "Complete training evaluation", "Buy hobby materials",
    "Schedule fence repair", "Learn artificial intelligence", "Write meeting minutes", "Clean desk drawers", "Update contact lists",
    "Research time management", "Plan surprise party", "Fix broken handle", "Complete incident report", "Buy seasonal items",
    "Schedule window replacement", "Learn blockchain technology", "Write standard procedures", "Clean supply closet", "Update documentation",
    "Research remote work tools", "Plan volunteer event", "Fix faulty switch", "Complete quarterly review", "Buy gift cards",
    "Schedule solar panel cleaning", "Learn machine learning", "Write best practices guide", "Clean conference room", "Update training materials",
    "Research sustainability practices", "Plan awards ceremony", "Fix damaged wall", "Complete budget analysis", "Buy promotional items",
    "Schedule security system check", "Learn quality assurance", "Write troubleshooting guide", "Clean break room", "Update policy manual",
    "Research innovation strategies", "Plan retirement party", "Fix broken lock", "Complete market research", "Buy reference books",
    "Schedule energy audit", "Learn business analytics", "Write operational procedures", "Clean reception area", "Update contact database",
    "Research competitive analysis", "Plan product launch", "Fix damaged ceiling", "Complete customer survey", "Buy educational materials",
    "Schedule maintenance check", "Learn supply chain management", "Write quality standards", "Clean parking area", "Update training records",
    "Research customer retention", "Plan holiday celebration", "Fix broken window", "Complete vendor evaluation", "Buy safety equipment",
    "Schedule equipment calibration", "Learn lean manufacturing", "Write compliance manual", "Clean warehouse space", "Update inventory system",
    "Research market trends", "Plan trade show", "Fix damaged floor", "Complete financial audit", "Buy technology upgrades",
    "Schedule facility inspection", "Learn risk management", "Write emergency procedures", "Clean production area", "Update safety protocols",
    "Research customer feedback", "Plan open house", "Fix malfunctioning equipment", "Complete performance metrics", "Buy maintenance supplies",
    "Schedule compliance review", "Learn change management", "Write training curriculum", "Clean laboratory space", "Update equipment logs",
    "Research process improvement", "Plan employee appreciation", "Fix structural issue", "Complete cost analysis", "Buy testing equipment",
    "Schedule quality control", "Learn strategic planning", "Write evaluation criteria", "Clean technical area", "Update calibration records",
    "Research benchmarking", "Plan stakeholder meeting", "Fix system malfunction", "Complete efficiency study", "Buy specialized tools",
    "Schedule performance review", "Learn continuous improvement", "Write implementation plan", "Clean control room", "Update monitoring systems",
    "Research best practices", "Plan annual conference", "Fix process bottleneck", "Complete gap analysis", "Buy measurement devices",
    "Schedule team building", "Learn project coordination", "Write assessment framework", "Clean archive room", "Update documentation system"
];

export const todos: Todo[] = [];

// Generate 500+ todos
for (let i = 0; i < 500; i++) {
    const taskIndex = Math.floor(Math.random() * todoTasks.length);
    const task = todoTasks[taskIndex];
    
    // Generate varied dates - some past, some future
    const daysOffset = Math.floor(Math.random() * 60) - 30; // -30 to +30 days
    const endDate = getRandomDate(daysOffset, 3);
    
    todos.push({
        id: Date.now() + i + 1,
        text: `${task} ${i > 0 ? `(${i})` : ''}`,
        endDate,
        completed: getRandomBoolean(),
        priority: getRandomPriority()
    });
}

// Add some specific test cases at the beginning
export const specificTodos: Todo[] = [
    { id: 1, text: "Buy groceries", endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), completed: false, priority: "MEDIUM" },
    { id: 2, text: "Walk the dog", endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), completed: true, priority: "LOW" },
    { id: 3, text: "Read a book", endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), completed: false, priority: "HIGH" },
    { id: 4, text: "Finish taxes", endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), completed: true, priority: "HIGH" },
    { id: 5, text: "Call mom", endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), completed: false, priority: "LOW" },
];

// Combine specific todos with generated ones
export { todos as generatedTodos };
export const allTodos = [ ...todos];