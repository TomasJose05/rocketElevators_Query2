// Variables
    // Oculta todos los contenidos primero
    document.getElementById("residentialContent").style.display = "none";
    document.getElementById("commercialContent").style.display = "none";
    document.getElementById("industrialContent").style.display = "none";


//Variables for step division
const div_step1 = document.getElementById("divStep1");
const div_step2 = document.getElementById("divStep2");
const div_step3 = document.getElementById("divStep3");
const div_step4 = document.getElementById("divStep4");

//variable for building type
const selectType = document.getElementById("typeBuild");

//Variable for step2 div
const divR1 = document.getElementById("divR1"); 
const divR2 = document.getElementById("divR2"); 
const divC1 = document.getElementById("divC1"); 
const divC2 = document.getElementById("divC2"); 
const divI = document.getElementById("divI");

//Inputs for step2
const inputr1 = document.getElementById("inputr1"); 
const inputr2 = document.getElementById("inputr2"); 
const inputc1 = document.getElementById("inputc1"); 
const inputc2 = document.getElementById("inputc2"); 
const inputi1 = document.getElementById("inputi1"); 



function showBuildingOptions() {
    // Oculta todos los contenidos primero
    document.getElementById("residentialContent").style.display = "none";
    document.getElementById("commercialContent").style.display = "none";
    document.getElementById("industrialContent").style.display = "none";

    // Muestra el contenido correspondiente a la opción seleccionada
    const selectedValue = selectType.value;
    if (selectedValue === "residential") {
        document.getElementById("residentialContent").style.display = "block";
    } else if (selectedValue === "commercial") {
        document.getElementById("commercialContent").style.display = "block";
    } else if (selectedValue === "industrial") {
        document.getElementById("industrialContent").style.display = "block";
    }
}


// Función principal para realizar los cálculos basados en el tipo de edificio
function calculateByBuildingType() {
    const buildingType = selectType.value;

    if (buildingType === "residential") {
        calculateResidential();
    } else if (buildingType === "commercial") {
        calculateCommercial();
    } else if (buildingType === "industrial") {
        calculateIndustrial();
    } else {
        alert("Por favor, seleccione un tipo de edificio válido.");
    }
}

// Cálculo para el tipo Residential
function calculateResidential() {
    const apartments = parseInt(inputr1.value) || 0;
    const floors = parseInt(inputr2.value) || 0;

    if (apartments <= 0 || floors <= 0) {
        alert("Por favor, ingrese valores válidos para apartamentos y pisos.");
        return;
    }

    // Cálculos específicos para Residential
    const apartmentsPerFloor = apartments / floors;
    let elevators = Math.ceil(apartmentsPerFloor / 6);
    const elevatorBanks = Math.ceil(floors / 20);
    elevators *= elevatorBanks;

    calculateTotalCost(elevators);
}

// Cálculo para el tipo Commercial
function calculateCommercial() {
    const floors = parseInt(inputc1.value) || 0;
    const occupancy = parseInt(inputc2.value) || 0;

    if (floors <= 0 || occupancy <= 0) {
        alert("Por favor, ingrese valores válidos para pisos y ocupación.");
        return;
    }

    // Cálculos específicos para Commercial
    const totalOccupants = floors * occupancy;
    const elevatorsPerBank = Math.ceil(totalOccupants / 200);
    const elevatorBanks = Math.ceil(floors / 10);
    const totalElevators = (elevatorsPerBank * elevatorBanks) + elevatorBanks;

    calculateTotalCost(totalElevators);
}

// Cálculo para el tipo Industrial
function calculateIndustrial() {
    const elevators = parseInt(inputi1.value) || 0;

    if (elevators <= 0) {
        alert("Por favor, ingrese un número válido de ascensores.");
        return;
    }

    calculateTotalCost(elevators);
};




//////////////
    // Cálculos específicos para Residential
    const apartmentsPerFloor = apartments / floors;
    let elevators = Math.ceil(apartmentsPerFloor / 6);
    const elevatorBanks = Math.ceil(floors / 20);
    elevators *= elevatorBanks;
    function calculateTotalCost(elevators) {
        // Validation to ensure 'elevators' has a valid value
        if (!elevators || isNaN(elevators) || elevators <= 0) {
            alert("Por favor ingrese un número válido de ascensores.");
            return;
        }
    
        // Get the value of the selected category
        const category = document.getElementById("divStep3").value;
    
        // Define prices and installation fees based on category
        let elevatorPrice = 0;
        let installFeePercent = 0;
    
        if (category === "standard") {
            elevatorPrice = 8000;
            installFeePercent = 0.10;
        } else if (category === "premium") {
            elevatorPrice = 12000;
            installFeePercent = 0.15;
        } else if (category === "excelium") {
            elevatorPrice = 15000;
            installFeePercent = 0.20;
        } 
    
       // Total cost calculations
        const totalElevatorCost = elevators * elevatorPrice; // Cost of elevators
        const installationFee = totalElevatorCost * installFeePercent; // Installation cost
        const totalPrice = totalElevatorCost + installationFee; // Total cost
    
        // Show results in the interface
        document.getElementById("unitPrice").innerText = "$" + elevatorPrice.toLocaleString();
        document.getElementById("elevatorCost").innerText = "$" + totalElevatorCost.toLocaleString();
        document.getElementById("installationFee").innerText = "$" + installationFee.toLocaleString();
        document.getElementById("totalCost").innerText = "$" + totalPrice.toLocaleString();
    
        console.log("calculateTotalCost fue ejecutada");
    }
    ////////////

function calculateTotalCost(elevators) {
    // Validación para asegurarse de que 'elevators' tenga un valor válido
    if (!elevators || isNaN(elevators) || elevators <= 0) {
        alert("Por favor ingrese un número válido de ascensores.");
        return;
    }

    // Obtiene el precio por ascensor y el porcentaje de la tarifa de instalación
    const { price: elevatorPrice, installFeePercent } = getElevatorPricing();

    // Cálculos de costo total
    const totalElevatorCost = elevators * elevatorPrice; // Costo de los ascensores
    const installationFee = totalElevatorCost * installFeePercent; // Costo de instalación
    const totalPrice = totalElevatorCost + installationFee; // Costo total

    // Mostrar resultados en la interfaz
    document.getElementById("unitPrice").innerText = "$" + elevatorPrice.toLocaleString();
    document.getElementById("elevatorCost").innerText = "$" + totalElevatorCost.toLocaleString();
    document.getElementById("installationFee").innerText = "$" + installationFee.toLocaleString();
    document.getElementById("totalCost").innerText = "$" + totalPrice.toLocaleString();
}

const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", function(event) {
        const inputs = form.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            if (input.value === "" || input.value < 0) {
                event.preventDefault(); 
                alert("Please, don't use negative numbers.");
                input.focus();
            }
        });
    });
});

function getElevatorPricing() {
    const category = document.getElementById("elevatorCategory").value;
    if (category === "standard") return { price: 8000, installFeePercent: 0.10 };
    if (category === "premium") return { price: 12000, installFeePercent: 0.15 };
    if (category === "excelium") return { price: 15000, installFeePercent: 0.20 };
}

function calculateResidential() {
    const apartments = parseInt(document.getElementById("r1").value) || 0;
    const floors = parseInt(document.getElementById("r2").value) || 0;

    const apartmentsPerFloor = apartments / floors;
    let elevators = Math.ceil(apartmentsPerFloor / 6);
    const elevatorBanks = Math.ceil(floors / 20);
    elevators *= elevatorBanks;

    calculateTotalCost(elevators);
}

function calculateCommercial() {
    const floors = parseInt(document.getElementById("c1").value) || 0;
    const occupancy = parseInt(document.getElementById("c2").value) || 0;

    const totalOccupants = floors * occupancy;
    const elevatorsPerBank = Math.ceil(totalOccupants / 200);
    const elevatorBanks = Math.ceil(floors / 10);
    const totalElevators = (elevatorsPerBank * elevatorBanks) + elevatorBanks;

    calculateTotalCost(totalElevators);
}

function calculateIndustrial() {
    const elevators = parseInt(document.getElementById("i1").value) || 0;
    calculateTotalCost(elevators);
}

});