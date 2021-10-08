import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import {fetchCollection} from '../api/fetchCollection'

test('test collections', async () => {
    render(<App/>);

    let realm = 'Thrall';
    let character = 'Nadare';

    let namespace = 'profile-eu';
    let locale = 'de_de';

    /* set the realm */
    let realmInput = screen.getByPlaceholderText('Realm');
    expect(realmInput).toBeInTheDocument();
    fireEvent.change(realmInput, {target: {value: realm}});
    expect(realmInput).toHaveValue(realm);

    /* set the character */
    let characterInput = screen.getByPlaceholderText('Character Name');
    expect(characterInput).toBeInTheDocument();
    fireEvent.change(characterInput, {target: {value: character}});
    expect(characterInput).toHaveValue(character);

    let requestDataButton = screen.getByText('Request Data');
    expect(requestDataButton).toBeInTheDocument();

    /* request the data  */
    fetchCollection.mockResolvedValueOnce(createMountsObject());
    fetchCollection.mockResolvedValueOnce(createPetsObject());

    fireEvent.click(requestDataButton);

    /* wait until 'requestData' is resolved */
    await tick();

    expect(fetchCollection).toHaveBeenCalledTimes(2);

    expect(fetchCollection).toHaveBeenNthCalledWith(1, realm.toLowerCase(), character.toLowerCase(), 'mounts', namespace, locale);
    expect(fetchCollection).toHaveBeenNthCalledWith(2, realm.toLowerCase(), character.toLowerCase(), 'pets', namespace, locale);

    // await waitFor(() => expect(screen.getByText('Testname_mount')).toBeInTheDocument());
    // await waitFor(() => expect(screen.getByText('Testname_pet')).toBeInTheDocument());
});

function tick() {
    /* https://stackoverflow.com/questions/37408834/testing-with-reacts-jest-and-enzyme-when-simulated-clicks-call-a-function-that */
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    })
}

function createMountsObject() {
    let data = {
        mounts: []
    };

    let dataEntry = {
        is_usable: true,
        mount: {
            id: 1,
            key: {href: ''},
            name: 'Testname_mount'
        }
    };

    data.mounts.push(dataEntry);

    return data;
}

function createPetsObject() {
    let data = {
        pets: [],
        unlocked_battle_pet_slots: 3
    };

    let dataEntry = {
        // creature_display: {id: 1, key: {href: ''}},
        id: 1,
        level: 1,
        quality: {name: 'Ungewöhnlich', type: 'UNCOMMON'},
        species: {id: 1, key: {href: ''}, name: 'Testname_pet'},
        stats: {
            breed_id: 1,
            health: 100,
            power: 5,
            speed: 5
        }
    };

    data.pets.push(dataEntry);

    return data;
}
