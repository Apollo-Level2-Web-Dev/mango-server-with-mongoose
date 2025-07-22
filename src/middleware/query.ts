import { Request, Response, NextFunction } from 'express';
import { Model, FilterQuery } from 'mongoose';

export const queryBuilder =
  <T>(model: Model<T>, searchableFields: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = { ...req.query };
      let mongoQuery: FilterQuery<T> = {};

      // SEARCH
      const searchTerm = queryParams.searchTerm as string;
      if (searchTerm) {
        mongoQuery.$or = searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            } as FilterQuery<T>)
        );
      }

      // FILTER
      const excludeFields = [
        'searchTerm',
        'sort',
        'limit',
        'page',
        'fields',
        'minPrice',
        'maxPrice',
      ];
      excludeFields.forEach((field) => delete queryParams[field]);

      for (const key in queryParams) {
        const value = queryParams[key];
        if (typeof value === 'string') {
          (mongoQuery as any)[key] = { $regex: value, $options: 'i' };
        }
      }

      // PRICE RANGE
      const minPrice = Number(req.query.minPrice);
      const maxPrice = Number(req.query.maxPrice);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        (mongoQuery as any)['price'] = { $gte: minPrice, $lte: maxPrice };
      }

      // Base Mongoose Query
      let query = model.find(mongoQuery);

      // SORT
      const sortBy =
        (req.query.sort as string)?.split(',')?.join(' ') || '-createdAt';
      query = query.sort(sortBy);

      // FIELDS
      const fields =
        (req.query.fields as string)?.split(',')?.join(' ') || '-__v';
      query = query.select(fields);

      // PAGINATION
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      // TOTAL COUNT for pagination
      const total = await model.countDocuments(mongoQuery);
      const totalPage = Math.ceil(total / limit);

      // Attach results and meta to res.locals
      const results = await query;

      res.locals.data = {
        meta: {
          page,
          limit,
          total,
          totalPage,
        },
        results,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
