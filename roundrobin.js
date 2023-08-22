// Arreglo de líneas de código válidas
const validCodeLines = [
  'a = 1 + 2;',
  'b = 3 + 4;',
  'c = 5 + 6;',
  'console.log("Hola Mundo");',
  'console.log("Adiós Mundo");'
];

// Función para elegir aleatoriamente una línea de código válida
const getRandomCodeLine = () => {
  const randomIndex = Math.floor(Math.random() * validCodeLines.length);
  return validCodeLines[randomIndex];
};

// Función para crear un proceso con número y líneas de código aleatorias
const createProcess = (processNumber) => {
  const process = {
    number: processNumber,
    code: []
  };

  // Agregar líneas de código aleatorias al proceso
  for (let i = 0; i < 3; i++) {
    process.code.push(getRandomCodeLine());
  }

  return process;
};

// Función para agregar contenido al elemento HTML de salida
const addToOutput = (outputDiv, text) => {
  const outputLine = document.createElement("p");
  outputLine.textContent = text;
  outputDiv.appendChild(outputLine);
};

// Función para inicializar la simulación
const initializeSimulation = (numProcesses, outputDiv) => {
  if (isNaN(numProcesses) || numProcesses <= 0) {
    addToOutput(outputDiv, "Por favor, proporciona un número válido de procesos.");
  } else {
    const autoProcesses = [];
    for (let i = 1; i <= numProcesses; i++) {
      autoProcesses.push(createProcess(i));
    }

    // Mostrar los procesos creados automáticamente
    autoProcesses.forEach(process => {
      addToOutput(outputDiv, `Proceso ${process.number}`);
      process.code.forEach(codeLine => {
        addToOutput(outputDiv, `Línea de código: ${codeLine}`);
      });
      addToOutput(outputDiv, ""); // Línea en blanco para separar los procesos
    });

    // Iniciar la simulación
    startSimulation(autoProcesses, outputDiv);
  }
};

// Función para empezar la simulación
const startSimulation = (processes, outputDiv) => {
  let currentProcessIndex = 0;
  let currentLineIndex = 0;

  const executeNextLine = () => {
    const process = processes[currentProcessIndex];
    if (currentLineIndex < process.code.length) {
      const currentCodeLine = process.code[currentLineIndex];
      addToOutput(outputDiv, `Proceso ${process.number} - Línea de código: ${currentCodeLine}`);
      currentLineIndex++;
    } else {
      addToOutput(outputDiv, `Proceso ${process.number} Terminado`);
      currentProcessIndex = (currentProcessIndex + 1) % processes.length;
      currentLineIndex = 0;
    }
  };

  // Configurar el intervalo para la ejecución de la simulación
  const interval = setInterval(() => {
    executeNextLine();
    if (currentLineIndex === 0 && currentProcessIndex === 0) {
      clearInterval(interval);
    }
  }, 1000);
};

// Obtener el elemento HTML de salida
const outputDiv = document.getElementById("output");

// Preguntar al usuario cuántos procesos desea ejecutar
const numProcesses = parseInt(prompt('¿Cuántos procesos deseas ejecutar?'));
initializeSimulation(numProcesses, outputDiv);