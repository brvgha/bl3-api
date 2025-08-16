export const seedData = {
    unAuthBookings: {
        _model: "unAuthBookings",
        user1: {
            name: 'Aroha Taylor',
            email: 'aroha.t@example.com',
            phone: '022 987 1234',
            date: '2025-09-12',
            time: '18:30',
            guests: 3,
        },
        user2: {
            name: 'Ben Miller',
            email: 'ben.miller@example.net',
            phone: '09 444 5566',
            date: '2025-09-15',
            time: '13:00',
            guests: 5,
        }
    },
    authBookings: {
        _model: "authBookings",
        user3: {
            name: 'Chloe Garcia',
            email: 'c.garcia@example.com',
            phone: '+1 415 555 0182', // International number example
            date: '2025-10-01',
            time: '19:45',
            guests: 2,
        },

    }
};