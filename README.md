
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPL-3.0][license-shield]][license-url]

# Deep learning in Radiotherapy products

> **Note**: The website repository has been migrated to [https://github.com/DLinRT-eu/dlinrteu-website](https://github.com/DLinRT-eu/dlinrteu-website).

## Documentation

### For Administrators
- [Admin Guide](./docs/ADMIN_GUIDE.md) - User management, review assignment, security monitoring

### For Reviewers  
- [Reviewer Guide](./docs/REVIEWER_GUIDE.md) - Product review workflow and best practices

### For Product Updates
- [Review Guide](./docs/review/GUIDE.md) - How to review and update product information
- [Manufacturer Templates](./MANUFACTURER_TEMPLATES.md) - Communication templates



---

## Adding New Products

### Product Structure Overview

Products in DLinRT.eu support:
- **Multiple Categories**: Products can belong to multiple categories using the `secondaryCategories` field
- **Multiple Versions**: Different versions of the same product can be tracked with separate `version` and `releaseDate` fields
- **Comprehensive Data**: Each product includes regulatory, technical, market, and evidence information

### Steps to Add a New Product:

1. **Determine the Appropriate Category**
   - Products are organized by primary category in `src/data/products/` directory
   - Use `secondaryCategories` field for products that span multiple categories
   - See the [Review Guide](./docs/review/GUIDE.md) for current categories

2. **Create or Update the Company-Specific File**
   - Each company has its own file in the appropriate category directory
   - If the company already exists, add your product to its file
   - If it's a new company, create a new file named `company-name.ts`
   - Example: `src/data/products/auto-contouring/varian.ts`

3. **Follow the Data Format**
   - See [example templates](./src/data/products/examples) for properly formatted data
   - Include `secondaryCategories` array for multi-category products
   - Use separate entries for different product versions with distinct `version` and `releaseDate` fields
   - Ensure all dates follow YYYY-MM-DD format
   - Include regulatory information with proper structure

4. **Multiple Versions Support**
   - Create separate product entries for major version releases
   - Use consistent `id` patterns (e.g., `product-v1`, `product-v2`)
   - Track evolution through `version` and `releaseDate` fields
   - Maintain backward compatibility in data structure

5. **Update the Category Index**
   - After adding the product, update the category index file to include your new products

6. **Add the Company Logo**
   - Place the company logo in the `/public/logos/` directory
   - Use a consistent naming scheme: `company-name.png`

For complete examples, refer to the example templates in `src/data/products/examples/`.

---

## Development

This project is built with:

- Vite
- TypeScript
- React
- Tailwind CSS

### Running Locally

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repository
git clone https://github.com/DLinRT-eu/website.git

# Navigate to the project directory
cd website

# Install dependencies
npm install

# Start the development server
npm run dev
```

You can also use GitHub Codespaces for development:
1. Navigate to the repository
2. Click "Code" > "Codespaces"
3. Create a new codespace to start developing

## License

This project is licensed under the GNU AGPL-3.0 License - see the LICENSE file for details.

## Team

<div align="center">
  <p><strong>Matteo Maspero</strong></p>
  <p>Project Lead - Computational Imaging Group Utrecht</p>
</div>

Feel free to contact the Project Lead in case you would like to be involved!

## How to Contribute

We welcome contributions to improve the accuracy of product information. If you notice any inaccuracies or have updates about the AI products listed, please:

1. Open an issue describing the update needed.
2. Submit a pull request with your changes.
3. Ensure proper attribution and documentation.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/DLinRT-eu/website.svg?style=for-the-badge
[contributors-url]: https://github.com/DLinRT-eu/website/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DLinRT-eu/website.svg?style=for-the-badge
[forks-url]: https://github.com/DLinRT-eu/website/network/members
[stars-shield]: https://img.shields.io/github/stars/DLinRT-eu/website.svg?style=for-the-badge
[stars-url]: https://github.com/DLinRT-eu/website/stargazers
[issues-shield]: https://img.shields.io/github/issues/DLinRT-eu/website.svg?style=for-the-badge
[issues-url]: https://github.com/DLinRT-eu/website/issues
[license-shield]: https://img.shields.io/github/license/DLinRT-eu/website.svg?style=for-the-badge
[license-url]: https://github.com/DLinRT-eu/website/blob/master/LICENSE
