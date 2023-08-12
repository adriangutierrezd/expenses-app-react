const { server } = require('../index')
const { mongoose } = require('../mongo')
const { api, getUsers, resetUsersForTest, getCategories, deleteAllCategories, createDefaultCategory } = require('./helpers')

describe('creating a new category', () => {

    beforeEach(async () => {
        await resetUsersForTest()
        await deleteAllCategories()
    })

    test('works as expected creating a fresh category', async () => {

        const categoriesAtStart = await getCategories()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')

        const newCategory = {
            name: 'Test Category',
            color: '#2e4263',
            user: user.id
        }

        await api.post('/categories')
            .send(newCategory)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const categoriesAtEnd = await getCategories()
        expect(categoriesAtEnd).toHaveLength(categoriesAtStart.length + 1)


    })

    test('fails with propper status code and message when user is not found', async () => {
        const categoriesAtStart = await getCategories()

        const newCategory = {
            name: 'Test Category',
            color: '#2e4263',
            user: '64d72968953096ca88610486'
        }

        const result = await api.post('/categories')
            .send(newCategory)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        expect(result.body.message).toContain('User not found')

        const categoriesAtEnd = await getCategories()
        expect(categoriesAtEnd).toHaveLength(categoriesAtStart.length)
    })

    test('fails when color has not propper format', async () => {

        const categoriesAtStart = await getCategories()

        const users = await getUsers()
        const user = users.find(us => us.username === 'defaultUser')

        const newCategory = {
            name: 'Test Category',
            color: '#2e263',
            user: user.id
        }

        const result = await api.post('/categories')
            .send(newCategory)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        expect(result.body.message).toContain('Invalid HEX color format')

        const categoriesAtEnd = await getCategories()
        expect(categoriesAtEnd).toHaveLength(categoriesAtStart.length)


    })

})


describe('updating a category', () => {

    beforeEach(async () => {
        await resetUsersForTest()
        await deleteAllCategories()
    })


    test('works properly on right requests', async () => {

        const category = await createDefaultCategory()
        const categoriesAtStart = await getCategories()

        const newCategory = {
            name: 'Updated default category',
            color: '#2e4263'
        }

        await api.put(`/categories/${category.id}`)
            .send(newCategory)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const categoriesAtEnd = await getCategories()
        expect(categoriesAtEnd).toHaveLength(categoriesAtStart.length)

        const targetCategory = categoriesAtEnd.find(catg => catg.id == category.id)

        expect(targetCategory.name).toBe(newCategory.name)
        expect(targetCategory.color).toBe(newCategory.color)

    })


    test('fails when color has not propper format', async () => {
        const category = await createDefaultCategory()
        const categoriesAtStart = await getCategories()

        const newCategory = {
            name: 'Updated default category',
            color: '2e4263'
        }

        await api.put(`/categories/${category.id}`)
            .send(newCategory)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const categoriesAtEnd = await getCategories()
        expect(categoriesAtEnd).toHaveLength(categoriesAtStart.length)

        const targetCategory = categoriesAtEnd.find(catg => catg.id == category.id)

        expect(targetCategory.name).toBe(category.name)
        expect(targetCategory.color).toBe(category.color)

    })

})


afterAll(() => {
    server.close()
    mongoose.connection.close()
})