function findAllRoutes(graph, origin, destination) {
    function implementDFS(currStation, destination, route, visited, allRoutes, totalDistance, currTotalFare, firstStation, prevStation, typeOfRide) {
        route.push(currStation);
        visited.add(currStation);
        console.log("Visited: " + currStation);
        
        if (stationDetails[currStation][0] != stationDetails[prevStation][0]) {

            let fareMatrix = stationDetails[firstStation][1];
    
            if (typeOfRide === 'Single Journey') {
                currTotalFare += fareMatrix[prevStation][0];
            }
            else {
                currTotalFare += fareMatrix[prevStation][1];
            }

            firstStation = currStation
        }

        prevStation = currStation;

        if (currStation === destination) {

            fareMatrix = stationDetails[firstStation][1];
            currTotalFare += fareMatrix[currStation][0];

            allRoutes.push({
                route: [...route],
                finalTotalDistance: totalDistance,
                finalTotalFair: currTotalFare,
                numStations: route.length - 1
            });

        } else {

            for (const [adjacentStation, distance] of graph[currStation]) {

                if (!visited.has(adjacentStation)) {
                    totalDistance += distance;
                    implementDFS(adjacentStation, destination, route, visited, allRoutes, totalDistance, currTotalFare, firstStation, prevStation, typeOfRide);
                }
            }
        }

        route.pop();
        visited.delete(currStation);
    }

    const allRoutes = [];
    let firstStation = origin;
    let prevStation = origin;
    let typeOfRide = 'Single Journey';

    implementDFS(origin, destination, [], new Set(), allRoutes, 0, 0, firstStation, prevStation, typeOfRide);

    return allRoutes;
}


const stationMapGraph = {

    //LRT 1
    'Fernando Poe Jr./Roosevelt': [['Balintawak (LRT1)', 1.87]],
    'Balintawak (LRT1)': [['Yamaha Monumento', 2.25], ['Fernando Poe Jr./Roosevelt', 1.87], ['Balintawak (Carousel)', 0]],
    'Yamaha Monumento': [['5th Avenue', 1.087], ['Balintawak (LRT1)', 2.25]],
    '5th Avenue': [['R-Papa', 0.954], ['Yamaha Monumento', 1.087]],
    'R-Papa': [['Abad Santos', 0.66], ['5th Avenue', 0.954]],
    'Abad Santos': [['Blumentritt', 0.927], ['R-Papa', 0.66]],
    'Blumentritt': [['Tayuman', 0.671], ['Abad Santos', 0.927]],
    'Tayuman': [['Bambang', 0.618], ['Blumentritt', 0.671]],
    'Bambang': [['Doroteo Jose', 0.648], ['Tayuman', 0.618]],
    'Doroteo Jose': [['Carriedo', 0.685], ['Bambang', 0.648], ['Recto', 0]],
    'Carriedo': [['Central Terminal', 0.725], ['Doroteo Jose', 0.685]],
    'Central Terminal': [['United Nations Avenue', 1.214], ['Carriedo', 0.725]],
    'United Nations Avenue': [['Pedro Gil', 0.754], ['Central Terminal', 1.214]],
    'Pedro Gil': [['Quirino', 0.794], ['United Nations Avenue', 0.754]],
    'Quirino': [['Vito Cruz', 0.827], ['Pedro Gil', 0.794]],
    'Vito Cruz': [['Gil Puyat', 1.061], ['Quirino', 0.827]],
    'Gil Puyat': [['Libertad', 0.73], ['Vito Cruz', 1.061]],
    'Libertad': [['EDSA', 1.01], ['Gil Puyat', 0.73]],
    'EDSA': [['Baclaran', 0.588], ['Libertad', 1.01], ['Taft Avenue (MRT3)', 0]],
    'Baclaran': [['EDSA', 0.588]],

    //LRT 2
    'Recto': [['Legarda', 1.05], ['Doroteo Jose', 0]],
    'Legarda': [['Pureza', 1.389], ['Recto', 1.05]],
    'Pureza': [['V-Mapa', 1.357], ['Legarda', 1.389]],
    'V-Mapa': [['J-Ruiz', 1.234], ['Pureza', 1.357]],
    'J-Ruiz': [['Gilmore', 0.928], ['V-Mapa', 1.234]],
    'Gilmore': [['Betty Go-Belmonte', 1.075], ['J-Ruiz', 0.928]],
    'Betty Go-Belmonte': [['Araneta Center-Cubao (LRT2)', 1.164], ['Gilmore', 1.075]],
    'Araneta Center-Cubao (LRT2)': [['Anonas', 1.438], ['Betty Go-Belmonte', 1.164], ['Araneta Center-Cubao (MRT3)', 0]],
    'Anonas': [['Katipunan', 0.955], ['Araneta Center-Cubao (LRT2)', 1.438]],
    'Katipunan': [['Santolan (LRT2)', 1.97], ['Anonas', 0.955]],
    'Santolan (LRT2)': [['Marikina/Pasig', 1.70], ['Katipunan', 1.97]],
    'Marikina/Pasig': [['Antipolo', 2.60], ['Santolan (LRT2)', 1.70]],
    'Antipolo': [['Marikina/Pasig', 2.60]],

    //MRT 3
    'North Avenue (MRT3)': [['Quezon Avenue (MRT3)', 1.22], ['North Avenue (Carousel)', 0]],
    'Quezon Avenue (MRT3)': [['GMA Kamuning', 0.94], ['North Avenue (MRT3)', 1.22], ['Quezon Avenue (Carousel)', 0]],
    'GMA Kamuning': [['Araneta Center-Cubao (MRT3)', 1.85], ['Quezon Avenue (MRT3)', 0.94], ['Quezon Avenue (Carousel)', 0]],
    'Araneta Center-Cubao (MRT3)': [['Santolan-Annapolis', 1.45], ['GMA Kamuning', 1.85], ['Araneta Center-Cubao (LRT2)', 0]],
    'Santolan-Annapolis': [['Ortigas (MRT3)', 2.31], ['Araneta Center-Cubao (MRT3)', 1.45]],
    'Ortigas (MRT3)': [['Shaw Boulevard', 0.77], ['Santolan-Annapolis', 2.31], ['Ortigas (Carousel)', 0]],
    'Shaw Boulevard': [['Boni', 0.98], ['Ortigas (MRT3)', 0.77]],
    'Boni': [['Guadalupe (MRT3)', 0.77], ['Shaw Boulevard', 0.98]],
    'Guadalupe (MRT3)': [['Buendia (MRT3)', 1.83], ['Boni', 0.77], ['Guadalupe (Carousel)', 0]],
    'Buendia (MRT3)': [['Ayala (MRT3)', 0.88], ['Guadalupe (MRT3)', 1.83], ['Buendia (Carousel)', 0]],
    'Ayala (MRT3)': [['Magallanes', 1.19], ['Buendia (MRT3)', 0.88]],
    'Magallanes': [['Taft Avenue (MRT3)', 1.89], ['Ayala (MRT3)', 1.19]],
    'Taft Avenue (MRT3)': [['Magallanes', 1.89], ['EDSA', 0]],

    //EDSA Carousel
    'Monumento (Carousel)': [['Bagong Barrio', 0.55]],
    'Bagong Barrio': [['Balintawak (Carousel)', 1.55], ['Monumento (Carousel)', 0.55]],
    'Balintawak (Carousel)': [['Kaingin Road', 0.80], ['Bagong Barrio', 1.55], ['Balintawak (LRT1)', 0]],
    'Kaingin Road': [['Roosevelt', 1.10], ['Balintawak (Carousel)', 0.80]],
    'Roosevelt': [['North Avenue (Carousel)', 1.50], ['Kaingin Road', 1.10]],
    'North Avenue (Carousel)': [['Quezon Avenue (Carousel)', 1.30], ['Roosevelt', 1.50], ['North Avenue (MRT3)', 0]],
    'Quezon Avenue (Carousel)': [['Nepa Q-Mart', 1.80], ['North Avenue (Carousel)', 1.30], ['Quezon Avenue (MRT3)', 0], ['GMA Kamuning', 0]],
    'Nepa Q-Mart': [['Main Avenue', 1.60], ['Quezon Avenue (Carousel)', 1.80]],
    'Main Avenue': [['Santolan (Carousel)', 0.80], ['Nepa Q-Mart', 1.60]],
    'Santolan (Carousel)': [['Ortigas (Carousel)', 2.40], ['Main Avenue', 0.80]],
    'Ortigas (Carousel)': [['Guadalupe (Carousel)', 2.40], ['Santolan (Carousel)', 2.40], ['Ortigas (MRT3)', 0]],
    'Guadalupe (Carousel)': [['Buendia (Carousel)', 2.00], ['Ortigas (Carousel)', 2.40], ['Guadalupe (MRT3)', 0]],
    'Buendia (Carousel)': [['Ayala (Carousel)', 2.90], ['Guadalupe (Carousel)', 2.00], ['Buendia (MRT3)', 0]],
    'Ayala (Carousel)': [['Tramo', 4.20], ['Buendia (Carousel)', 2.90]],
    'Tramo': [['Taft Avenue (Carousel)', 0.40]],
    'Taft Avenue (Carousel)': [['Roxas Boulevard', 0.80], ['Ayala (Carousel)', 4.70]],
    'Roxas Boulevard': [['MOA', 1.30], ['Taft Avenue (Carousel)', 0.80]],
    'MOA': [['DFA/Starbucks', 1.40]],
    'DFA/Starbucks': [['Ayala Malls Manila Bay/City of Dreams', 0.90], ['Roxas Boulevard', 1.10]],
    'Ayala Malls Manila Bay/City of Dreams': [['PITX', 5.30], ['DFA/Starbucks', 0.90]],
    'PITX': [['Ayala Malls Manila Bay/City of Dreams', 5.30]]

};


const yamahaMonumentoFares = {
    'Doroteo Jose': [20, 16]
}

const doroteoJoseFares = {
    'Yamaha Monumento': [20, 16]
}

const rectoFares = {
    'Pureza': [20, 16]
}

const purezaFares = {
    'Doroteo Jose': [20, 16]
}

const FPJFares = {
    'Balintawak (LRT1)': [15, 10]
}

const balintawakFares = {
    'Fernando Poe Jr./Roosevelt': [15, 10]
}


const stationDetails = {
    'Yamaha Monumento': ['LRT 1', yamahaMonumentoFares],
    'Doroteo Jose': ['LRT 1', doroteoJoseFares],
    'Recto': ['LRT 2', rectoFares],
    'Pureza': ['LRT 2', purezaFares],
    'Fernando Poe Jr./Roosevelt': ['LRT 1', FPJFares],
    'Balintawak (LRT1)': ['LRT 1', balintawakFares]
}




const origin = 'Fernando Poe Jr./Roosevelt';
const destination = 'Balintawak (LRT1)';

const allRoutes = findAllRoutes(stationMapGraph, origin, destination);

allRoutes.forEach(routeInfo => {
    console.log(`Route: ${routeInfo.route.join(' -> ')} \n\nTotal Distance: ${routeInfo.finalTotalDistance} km \nTotal Amount of Fare: Php ${routeInfo.finalTotalFair} \nNumber of Station Transfers: ${routeInfo.numStations}\n`);
});
