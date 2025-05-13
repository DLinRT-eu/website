[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPL-3.0][license-shield]][license-url]

# Deep learning in Radiotherapy products

> **Note**: The website is currently under development. We welcome contributions to verify and improve the product information accuracy.

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

---

## Reviewing Product Content

If you want to review or update the content of a product, here are the most relevant files and steps to follow:

### Key Files to Review
1. **`src/data/products.json`**  
   This file contains the core product data, including details like name, modality, anatomy, and certifications.  
   - **Action**: Verify the accuracy of product details and ensure consistency in tags (e.g., modality, anatomy, certifications).

2. **`src/components/product/RegulatoryInformationDetails.tsx`**  
   This component displays detailed product information on the website.  
   - **Action**: Check if the product details are rendered correctly and match the data in `products.json`.

3. **`src/config/tags.ts`**  
   This file defines the valid tags for modality, anatomy, and certifications.  
   - **Action**: Ensure that the tags used in `products.json` are consistent with the definitions here.

4. **`src/utils/validateTags.ts`**  
   This utility validates product tags against the predefined valid tags.  
   - **Action**: Confirm that the validation logic is working as expected and catches any inconsistencies.

---

### Suggested Course of Action
1. **Review Product Data**  
   Open `src/data/products.json` and verify the accuracy of the product details. Ensure that:
   - All fields are filled in correctly.
   - Tags (e.g., modality, anatomy, certifications) match the predefined valid tags in `src/config/tags.ts`.

2. **Test Product Rendering**  
   Run the development server and navigate to the product details page. Confirm that:
   - The product details are displayed correctly.
   - The taxonomy filters (e.g., modality, anatomy) work as expected.

3. **Validate Tags**  
   Use the validation utility (`src/utils/validateTags.ts`) to check for any invalid tags in the product data. Fix any issues found.

4. **Submit Changes**  
   After making updates:
   - Run tests to ensure everything works as expected.
   - Submit a pull request with a clear description of the changes made.

---

## Development

This project is built with:

- Vite
- TypeScript
- React
- Tailwind CSS

Here is a schematic architecture of the website 
'''mermaid
flowchart TD
    subgraph "User Browser"
        UB["User"]:::external
    end

    subgraph "Frontend"
        HTML["index.html"]:::artifact
        Main["main.tsx"]:::frontend
        App["App.tsx"]:::frontend
        Router["React Router"]:::frontend
        Pages["Pages"]:::frontend
        Components["Components"]:::component
        HooksServices["Hooks & Services"]:::service
        Provider["Provider"]:::service
    end

    subgraph "Data Layer"
        DataService["DataService.ts"]:::service
        Database["Data Files"]:::database
        LocalStorage["LocalStorage"]:::database
    end

    subgraph "Build & Config"
        Vite["Vite"]:::build
        Tailwind["Tailwind CSS"]:::build
        TS["TypeScript"]:::build
        ESLint["ESLint"]:::build
    end

    subgraph "CI/CD & Repo"
        RepoEvents["GitHub Repo"]:::build
        GHWorkflow["Deploy Workflow"]:::build
        Docs["Documentation"]:::build
    end

    UB -->|"loads"| HTML
    HTML --> Main
    Main --> App
    App --> Router
    Router --> Pages
    App --> Components
    Pages --> HooksServices
    Components --> HooksServices
    HooksServices --> DataService
    DataService --> Database
    App --> Provider
    Provider --> DataService
    DataService --> LocalStorage

    Vite -->|uses| TS
    Vite -->|uses| Tailwind
    Vite -->|uses| ESLint

    RepoEvents --> GHWorkflow
    GHWorkflow --> Vite
    RepoEvents --> Docs

    classDef frontend fill:#89CFF0,stroke:#333,stroke-width:1px
    classDef component fill:#add8e6,stroke:#333,stroke-width:1px
    classDef service fill:#f9f871,stroke:#333,stroke-width:1px
    classDef database fill:#90ee90,stroke:#333,stroke-width:1px
    classDef build fill:#d3d3d3,stroke:#333,stroke-width:1px
    classDef external stroke:#f00,stroke-dasharray:5 5
'''


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

This project is licensed under the GNU AGPL-3.0 License - see the LICENSE file for details. You are free to reuse and modify the code, provided you maintain the same license and provide proper attribution to the original authors.

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


