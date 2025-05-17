# DLinRT.eu Product Revision & Review Instructions

This guide is for contributors and reviewers working on the [DLinRT-eu/website](https://github.com/DLinRT-eu/website) repository.

## 1. Product Data Location
- Product data is stored in `src/data/products/` as TypeScript or JSON files.
- Each product is an object with fields such as `id`, `name`, `company`, `category`, `features`, etc.

## 2. How to Revise an Existing Product
1. Open the relevant file in `src/data/products/`.
2. Locate the product you wish to revise (search by `id` or `name`).
3. Edit the fields as needed (e.g., update the name, company, features, certification, etc.).
4. Save the file.
5. Ensure the product object matches the `Product` type in `src/types/product.d.ts`.

## 3. How to Add a New Product
1. Open or create a file in `src/data/products/` (e.g., `new-products.ts`).
2. Add a new product object following the existing format and required fields.
3. Assign a unique `id` to the new product.
4. Save the file.
5. Import and include the new product in the main product export (usually in `src/data/index.ts`).

## 4. How to Remove a Product
1. Open the relevant file in `src/data/products/`.
2. Delete the product object or comment it out.
3. Save the file.

## 5. Validation & Testing
- After making changes, run the app and check the Products page to ensure your changes appear as expected.
- If you encounter errors, check the console for type or syntax issues.

## 6. Submitting Changes (GitHub Workflow)
- Fork the repository and create a new branch for your changes.
- Commit your changes with a clear message.
- Open a Pull Request (PR) to the main repository.
- In the PR description, list the products you have revised/added/removed.
- Tag relevant reviewers or maintainers.

## 7. Reviewer Alignment & Product Review Status
To help reviewers align and track which products have been reviewed:
- Use GitHub PR comments or a checklist in the PR description to indicate which products have been reviewed and by whom.
- Example PR checklist:

```
### Product Review Checklist
- [x] Product A (reviewed by @reviewer1)
- [ ] Product B (pending)
- [x] Product C (reviewed by @reviewer2)
```

- Optionally, maintain a `REVIEW_STATUS.md` file in the repository root or `src/data/products/` to track review status over time.
- Reviewers should update the checklist or status file as they complete reviews.

## 8. Additional Notes
- Follow the product data format strictly to avoid runtime errors.
- For questions, contact the project maintainers or open an issue on GitHub.

---
For more details, see the main `README.md` or contact the DLinRT.eu team.
