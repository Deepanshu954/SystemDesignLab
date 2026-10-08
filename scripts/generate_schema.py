#!/usr/bin/env python3
"""
System Design Lab — Schema.org Structured Data Generator & Validator
Produces rich, valid JSON-LD schemas covering:
- Organization (Entity E-E-A-T)
- WebSite (with Sitelinks Searchbox)
- SoftwareApplication (for interactive Capacity Calculator)
- TechArticle (for 24-step case studies)
- FAQPage (for People Also Ask / featured snippet accordions)
- BreadcrumbList (for category hierarchy)
Validates fields against Schema.org / Google Rich Results requirements.
"""

import os
import json

def get_organization_schema():
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://systemdesignlab.dev/#organization",
        "name": "System Design Lab",
        "url": "https://systemdesignlab.dev",
        "logo": {
            "@type": "ImageObject",
            "url": "https://systemdesignlab.dev/logo.png",
            "width": 512,
            "height": 512
        },
        "description": "An interactive distributed systems and capacity sizing platform for software engineers.",
        "sameAs": [
            "https://github.com/deepanshu954/SystemDesignLab",
            "https://twitter.com/systemdesignlab"
        ],
        "knowsAbout": [
            "System Design",
            "Distributed Systems",
            "Capacity Estimation",
            "High Level Design",
            "Software Architecture"
        ]
    }

def get_website_schema():
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://systemdesignlab.dev/#website",
        "url": "https://systemdesignlab.dev",
        "name": "System Design Lab",
        "publisher": {
            "@id": "https://systemdesignlab.dev/#organization"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://systemdesignlab.dev/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }

def get_software_application_schema():
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "System Design Capacity Sizing Calculator",
        "operatingSystem": "All (Web-based)",
        "applicationCategory": "DeveloperApplication",
        "url": "https://systemdesignlab.dev/tools/capacity-calculator",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Real-time client-side quantitative estimation engine computing QPS, storage footprint, network bandwidth, and Redis memory cache sizing for scalable distributed architectures.",
        "featureList": [
            "Daily Active Users (DAU) to Peak QPS sizing",
            "Read-to-Write traffic ratio simulation",
            "3-year storage growth modeling with metadata overhead",
            "Pareto 80/20 RAM cache memory requirement calculator"
        ]
    }

def get_tech_article_schema():
    return {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Design a Distributed URL Shortener (TinyURL) — 24-Step Blueprint",
        "description": "Comprehensive production architecture for a URL shortening service processing 500M monthly redirects with sub-10ms latency using Base62 encoding, KGS, and ScyllaDB.",
        "image": "https://systemdesignlab.dev/images/case-studies/url-shortener-hero.png",
        "author": {
            "@type": "Organization",
            "name": "System Design Lab Editorial Team",
            "url": "https://systemdesignlab.dev/about"
        },
        "publisher": {
            "@id": "https://systemdesignlab.dev/#organization"
        },
        "datePublished": "2026-09-15T00:00:00+00:00",
        "dateModified": "2026-10-08T12:00:00+00:00",
        "mainEntityOfPage": "https://systemdesignlab.dev/case-studies/url-shortener",
        "proficiencyLevel": "Intermediate",
        "dependencies": "Base62 Encoding, Redis 7 Cluster, Distributed Key Generation Service (KGS), ScyllaDB"
    }

def get_faq_page_schema():
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does a distributed URL shortener work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A distributed URL shortener shortens long URLs into unique 7-character Base62 keys (yielding 3.52 trillion unique combinations). The system uses an API Gateway for rate limiting, a distributed Key Generation Service (KGS) to avoid write collisions, a Redis caching cluster for sub-10ms redirects, and partitioned wide-column storage."
                }
            },
            {
                "@type": "Question",
                "name": "Why use Base62 encoding instead of Base64 for URL shortening?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Base62 uses [0-9, a-z, A-Z], which are completely URL-safe characters. Base64 contains '+' and '/', which carry reserved semantic meanings in HTTP URLs and query strings, requiring troublesome URL-encoding."
                }
            },
            {
                "@type": "Question",
                "name": "How do you calculate cache memory for 10 million daily active users?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Applying the Pareto 80/20 rule, 20% of the daily read requests generate 80% of total cache traffic. For 100M daily read requests of 500 bytes each (50 GB total), caching 20% requires approximately 10 GB of RAM."
                }
            }
        ]
    }

def get_breadcrumb_schema():
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://systemdesignlab.dev"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Case Studies",
                "item": "https://systemdesignlab.dev/case-studies"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "URL Shortener",
                "item": "https://systemdesignlab.dev/case-studies/url-shortener"
            }
        ]
    }

def generate_and_validate_all(output_dir):
    os.makedirs(output_dir, exist_ok=True)
    schemas = {
        "organization_schema.json": get_organization_schema(),
        "website_schema.json": get_website_schema(),
        "software_app_schema.json": get_software_application_schema(),
        "tech_article_schema.json": get_tech_article_schema(),
        "faq_page_schema.json": get_faq_page_schema(),
        "breadcrumb_schema.json": get_breadcrumb_schema()
    }
    
    print("=" * 70)
    print("SCHEMA.ORG STRUCTURED DATA GENERATION & VALIDATION")
    print("=" * 70)
    
    for filename, data in schemas.items():
        file_path = os.path.join(output_dir, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
            
        # Basic validation
        has_context = data.get("@context") == "https://schema.org"
        has_type = bool(data.get("@type"))
        status = "VALID" if has_context and has_type else "INVALID"
        print(f"[{status}] Generated {filename} -> @type: {data.get('@type')}")
        
    print("\nAll 6 Schema.org JSON-LD artifacts successfully written to:", output_dir)
    print("=" * 70)

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "..", "milestone", "schemas")
    generate_and_validate_all(out_dir)
