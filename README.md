# @mutabazia/mongoose-pagination-express

A pagination library for use with **Express.js** and **Mongoose**, written in **TypeScript**.

## Installation

```bash
npm install @mutabazia/mongoose-pagination-express
```

## Usage

#### _Step 1_ - Import the **pagination** middleware and use it in your Express.js app:

```typescript
import { pagination } from "@mutabazia/mongoose-pagination-express";

const app = express();

// ...
app.use(pagination);
// ...
```

#### _Step 2_ - Use the **paginate()** method on your Mongoose **Query** or **Aggregate** objects:

```typescript
import { Request, Response } from 'express';
import { UserModel } from './models/user.model';

export const listUsers = async (req: Request, res: Response) => {
  // ...

  // 1. With Query
  const query = UserModel.find(...);
  query.where(...);
  const data = await query.paginate();

  // Or
  const data = await UserModel.find(...).where(...).paginate()

  // 2. With Aggregate
  const aggregate = UserModel.aggregate(...);
  aggregate.match(...);
  const data = await aggregate.paginate();

  // Or
  const data = await UserModel.aggregate(...).match(...).paginate();

  // ...
};
```

The **paginate()** method returns a **Promise** that resolves to a **Pagination** object containing the paginated data and metadata.

#### _Step 3_ - You can customize the pagination behavior by passing query parameters in the request URL:

```rest
GET /api/items?page=2&per_page=10&pagination=off
```

The following query parameters are supported:

- **page**: The page number to retrieve. Defaults to **1**.
- **per_page**: The number of items to retrieve per page. Defaults to **15**.
- **pagination**: The parameter to turn off pagination. You can set the value to **off**, **false**, or **0** to turn off pagination. By default, pagination is turned **on**.

> **Note**: **pagination=off** query parameter is a way to turn off pagination and retrieve all the results in a single query.
>
> This can be useful when you know that you don't want to paginate the results on an endpoint that has pagination implemeted, or if you are retrieving a small number of results and want to avoid the overhead of pagination.
>
> When **pagination=off** is used, the function will return a **Promise** that resolves to an array of results instead of a **Pagination** object. This array will contain all the results without any pagination information.
>
> It's worth noting that when pagination is turned off, the **per_page** and **page** parameters will be ignored.

## API

### `pagination`

The **pagination** middleware is a function that adds the **paginate()** method to the **Query** and **Aggregate** prototypes.

### `paginate<Doc>(per_page?: number): Promise<Pagination<Doc>>`

The **paginate()** function takes a **Query** or **Aggregate** object, and a **per_page** number, and returns a **Promise** that resolves to a **Pagination** object.

### `Pagination<Doc>`

The **Pagination** interface represents the result of a paginated query. It has the following properties:

- **from**: The index of the first item in the current page.
- **to**: The index of the last item in the current page.
- **per_page**: The number of items per page.
- **total**: The total number of items in the query.
- **current_page**: The current page number.
- **prev_page**: The previous page number, or **null** if the current page is the **first page**.
- **next_page**: The next page number, or **null** if the current page is the last page.
- **last_page**: The last page number, or **null** if there is only one page.
- **data**: An array of items in the current page.

## Disclaimer

This package was inspired by the [typeorm-pagination](https://www.npmjs.com/package/typeorm-pagination) package and some parts of the code were adapted from it. We thank the [typeorm-pagination](https://www.npmjs.com/package/typeorm-pagination) team for their work and contribution to the community.

## License

This library is licensed under the [MIT License](https://opensource.org/licenses/MIT)
