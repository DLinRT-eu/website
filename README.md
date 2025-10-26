# DLinRT.eu - Deep Learning in Radiotherapy Product Database

[![Website](https://img.shields.io/website?up_message=online&down_message=offline&url=https%3A%2F%2Fdlinrt.eu)](https://dlinrt.eu)
[![GitHub Stars](https://img.shields.io/github/stars/DLinRT-eu/website?style=social)](https://github.com/DLinRT-eu/website/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/DLinRT-eu/website?style=social)](https://github.com/DLinRT-eu/website/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/DLinRT-eu/website)](https://github.com/DLinRT-eu/website/issues)
[![License](https://img.shields.io/github/license/DLinRT-eu/website)](https://github.com/DLinRT-eu/website/blob/main/LICENSE)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Contributor%20Covenant-2ea44f)](https://github.com/DLinRT-eu/website/blob/main/CODE_OF_CONDUCT.md)

DLinRT.eu is an open, community-driven initiative to catalog deep learning solutions in radiotherapy. Our goal is to provide a comprehensive, transparent, and reliable resource for clinicians, researchers, and industry professionals seeking information about AI-powered tools in radiation oncology.

## Table of Contents

1. [Features](#features)
2. [Contributing](#contributing)
3. [Documentation](#documentation)
4. [Code of Conduct](#code-of-conduct)
5. [Security](#security)
6. [License](#license)

---

## Features

- **Comprehensive Database**: Explore a wide range of deep learning products used in radiotherapy.
- **Detailed Product Information**: Access key features, technical specifications, regulatory status, and market availability.
- **Company Directory**: Find detailed profiles of companies offering AI solutions for radiotherapy.
- **Model Card Exports**: Export detailed product information in JSON, CSV, Excel, and PDF formats with embedded logos.
- **Product Comparison**: Compare multiple products side-by-side with export capabilities.
- **Community-Driven**: Contribute to the platform by adding new products, verifying information, and sharing your expertise.
- **Open Access**: All content is freely accessible to promote transparency and collaboration.

## Visible Pages

- **Home** (`/`) - Main landing page with featured content
- **Products** (`/products`) - Browse and search all products
- **Companies** (`/companies`) - Company directory and profiles
- **Initiatives** (`/initiatives`) - Research projects and datasets
- **Dashboard** (`/dashboard`) - Analytics and statistics
- **News** (`/news`) - Latest updates and announcements
- **About** (`/about`) - Project information and team
- **Support** (`/support`) - Help and contact information

## Administrative Pages

Advanced functionality for authenticated users with appropriate roles:

### Admin Pages (Admin role required)
- **Admin Dashboard** (`/admin`) - Central administrative hub with stats and quick actions
- **User Management** (`/admin/users`) - Manage user roles and permissions
- **Review Assignment** (`/admin/reviews`) - Assign product reviews to reviewers
- **Security Dashboard** (`/admin/security`) - Monitor security events and system health

### Reviewer Pages (Reviewer or Admin role)
- **Review Dashboard** (`/review`) - Product review management interface
- **Reviewer Dashboard** (`/reviewer/dashboard`) - Personal reviewer workspace

### Company Pages (Company role)
- **Company Dashboard** (`/company/dashboard`) - Company representative portal

### Other Administrative Tools
- **Timeline Visualization** (`/timeline`) - Interactive data analysis and trends
- **Individual Product Review** (`/review/:id`) - Detailed product verification
- **Security Certifications** (`/security`) - Security compliance information
- **Security Monitoring** (`/security-monitoring`) - Real-time security dashboard
- **Export Presentation** (`/export-presentation`) - Bulk export functionality

### Admin Access

For detailed information on administrative features and procedures, see the [Admin Guide](ADMIN_GUIDE.md).

Team members with the following emails automatically receive admin access upon signup:
- matteo.maspero@dlinrt.eu
- mustafa.kadhim@dlinrt.eu
- ana.barragan@dlinrt.eu
- paul.doolan@dlinrt.eu
- federico.mastroleo@dlinrt.eu
- viktor.rogowski@dlinrt.eu
- info@dlinrt.eu

## Contributing

We welcome contributions from the community to help us maintain and expand the DLinRT.eu database. Whether you're a clinician, researcher, industry professional, or AI enthusiast, your contributions can make a significant impact.

To get started, please review our [Contributing Guide](CONTRIBUTING.md) for guidelines and best practices.

## Documentation

- **[Documentation Quick Links](DOCUMENTATION_LINKS.md)** - Central hub for all documentation
- **[Field Reference](docs/FIELD_REFERENCE.md)** - Comprehensive documentation of all data fields and vocabularies
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **[Product Review Guide](docs/review/GUIDE.md)** - Guide for reviewing and adding products
- **[Security](SECURITY.md)** - Security policies and reporting

## Field Standardization

**keyFeatures** is the canonical field for product features. The legacy `features` field has been deprecated to ensure consistency across all displays and exports.

## Code of Conduct

We are committed to fostering a welcoming and inclusive environment for all contributors. Please review our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a positive and respectful community.

## Security

We take the security of our platform seriously. Please review our [Security Guidelines](SECURITY.md) for information on reporting vulnerabilities and security best practices.

## License

This project is licensed under the [MIT License](LICENSE).
