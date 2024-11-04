console.log("JavaScript file is connected successfully.");



document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById("option");
    const calculateButton = document.getElementById("calculateButton");
    const r1 = document.getElementById("r1"); 
    const r2 = document.getElementById("r2"); 
    const c1 = document.getElementById("c1"); 
    const c2 = document.getElementById("c2"); 
    const i1 = document.getElementById("i1"); 

    dropdown.addEventListener("change", function() {
       // Hide all contents first
        document.getElementById("residentialContent").style.display = "none";
        document.getElementById("commercialContent").style.display = "none";
        document.getElementById("industrialContent").style.display = "none";

        // Displays the content corresponding to the selected option
        const selectedValue = dropdown.value;
        if (selectedValue === "residential") {
            document.getElementById("residentialContent").style.display = "block";
        } else if (selectedValue === "commercial") {
            document.getElementById("commercialContent").style.display = "block";
        } else if (selectedValue === "industrial") {
            document.getElementById("industrialContent").style.display = "block";
        } 
    });
// Variables

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

const optionInput2 = document.getElementById('option')


function showBuildingOptions() {
    // Hide all forms at the beginning
    document.getElementById("residentialContent").style.display = "none";
    document.getElementById("commercialContent").style.display = "none";
    document.getElementById("industrialContent").style.display = "none";

    // Shows the form corresponding to the selected option
    const selectedValue = document.getElementById("typeBuild").value;
    if (selectedValue === "residential") {
        document.getElementById("residentialContent").style.display = "block";
    } else if (selectedValue === "commercial") {
        document.getElementById("commercialContent").style.display = "block";
    } else if (selectedValue === "industrial") {
        document.getElementById("industrialContent").style.display = "block";
    }
}


// Main function to perform calculations based on the type of buildings
function calculateByBuildingType() {
    console.log("calculateByBuildingType is ready");
    const buildingType = optionInput2.value;
 console.log(buildingType)
    if (buildingType === "residential") {
        calculateResidential();
        calculateTotalCost(5);
    } else if (buildingType === "commercial") {
        calculateCommercial();
        calculateTotalCost(5);
    } else if (buildingType === "industrial") {
        calculateIndustrial();
        calculateTotalCost(5);
    } else {
        alert("Error");
    }
}
window.calculateByBuildingType = calculateByBuildingType;

function getElevatorPricing() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const category = selectedOption ? selectedOption.id : null;
    console.log("Category:", category); 
    if (category === "standard") return { price: 8000, installFeePercent: 0.10 };
    if (category === "premium") return { price: 12000, installFeePercent: 0.15 };
    if (category === "excelium") return { price: 15000, installFeePercent: 0.20 };
    return { price: 0, installFeePercent: 0 }
}


function calculateTotalCost(elevators) {
    // Validation to ensure 'elevators' has a valid value
    if (!elevators || isNaN(elevators) || elevators <= 0) {
        alert("Error");
        return;
    }


    // Get the value of the selected category
    const { price: elevatorPrice, installFeePercent } = getElevatorPricing();


    // Define prices and installation fees based on category
 
  const totalElevatorCost = elevators * elevatorPrice; 
  const installationFee = totalElevatorCost * installFeePercent; 
  const totalPrice = totalElevatorCost + installationFee; 

   document.getElementById("unitPrice").innerText = "$" + elevatorPrice.toLocaleString();
   document.getElementById("elevatorCost").innerText = "$" + totalElevatorCost.toLocaleString();
   document.getElementById("installationFee").innerText = "$" + installationFee.toLocaleString();
   document.getElementById("totalCost").innerText = "$" + totalPrice.toLocaleString();               

    console.log("calculateTotalCost");
}



// Calculation for Residential type
function calculateResidential() {
    const apartments = parseInt(inputr1.value) || 0;
    const floors = parseInt(inputr2.value) || 0;

    if (apartments <= 0 || floors <= 0) {
        alert("Error");
        return;
    }

    // Specific calculations for Residential
    const apartmentsPerFloor = apartments / floors;
    let elevators = Math.ceil(apartmentsPerFloor / 6);
    const elevatorBanks = Math.ceil(floors / 20);
    elevators *= elevatorBanks;


    console.log("Residential calculation successful"); // 
    console.log("Apartments:", inputr1.value); 
    console.log("Floors:", inputr2.value);
    console.log("Elevators:", elevators)
    document.getElementById("divStep4").style.display = "block";
    return elevators


}

// Calculation for Commercial type
function calculateCommercial() {
    const floors = parseInt(inputc1.value) || 0;
    const occupancy = parseInt(inputc2.value) || 0;

    if (floors <= 0 || occupancy <= 0) {
        alert("Error");
        return;
    }

    // Specific calculations for Commercial
    const totalOccupants = floors * occupancy;
    const elevatorsPerBank = Math.ceil(totalOccupants / 200);
    const elevatorBanks = Math.ceil(floors / 10);
    const elevators = (elevatorsPerBank * elevatorBanks) + elevatorBanks;

    
    console.log("Commercial calculation successful"); //
    console.log("Apartments:", inputc1.value); 
    console.log("Floors:", inputc2.value);
    console.log("Elevators:", elevators)
    document.getElementById("divStep4").style.display = "block";
    return elevators

}

// Calculation for Industrial type
function calculateIndustrial() {
    const elevators = parseInt(inputi1.value) || 0;

    if (elevators <= 0) {
        alert("Error");
        return;
    }

    calculateTotalCost(elevators);
    console.log("Industrial calculation successful"); // 
    console.log("Apartments:", inputi1.value); 
    document.getElementById("divStep4").style.display = "block";

    return elevators

}

document.getElementById("calculateButton").addEventListener("click", calculateByBuildingType);




});