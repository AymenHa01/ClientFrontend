import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

interface ArtworkItem {
  id: number;
  image: string;
  title: string;
  description: string;
  artist: string;
  price: string;
  category: string;
  tags: string[];
  expanded: boolean;
}

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {
  @ViewChild('galleryGrid') galleryGrid: any;
  
  searchTerm: string = '';
  categories: string[] = ['Tous', 'Peintures', 'Sculptures', 'Photos', 'Digital'];
  selectedCategory: string = 'Tous';
  loading: boolean = false;
  currentSection: string = 'hero';
  showBackToTop: boolean = false;
  
  // Sample featured items
  featuredItems = [
    {
      image: 'assets/featured1.jpg',
      title: 'Œuvre en Vedette 1',
      price: '2,500 €'
    },
    {
      image: 'assets/featured2.jpg',
      title: 'Œuvre en Vedette 2',
      price: '1,800 €'
    },
    {
      image: 'assets/featured3.jpg',
      title: 'Œuvre en Vedette 3',
      price: '3,200 €'
    }
  ];

  // Sample gallery items
  items: ArtworkItem[] = [
    {
      id: 1,
      image: '../../assets/a.JPG',
      title: 'Éclat de Couleurs',
      description: "Éclat de Couleurs est une frame artistique vibrante et dynamique qui capture l'énergie et la diversité des couleurs.",
      artist: 'Mohamed Fandouli',
      price: '100',
      category: 'Peintures',
      tags: ['Coloré', 'Moderne', 'Abstrait'],
      expanded: false
    },
    {
      id: 2,
      image: '../../assets/b.JPG',
      title: 'Harmonie Naturelle',
      description: "Une exploration des formes naturelles et des couleurs organiques.",
      artist: 'Mohamed Fandouli',
      price: '120',
      category: 'Photos',
      tags: ['Nature', 'Organique', 'Paisible'],
      expanded: false
    },
    {
      id: 3,
      image: '../../assets/c.JPG',
      title: 'Vision Moderne',
      description: "Une interprétation contemporaine de l'art traditionnel.",
      artist: 'Mohamed Fandouli',
      price: '150',
      category: 'Digital',
      tags: ['Contemporain', 'Innovation', 'Style'],
      expanded: false
    }
  ];

  filteredItems = this.items;

  constructor() { }

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkScroll();
  }

  checkScroll() {
    // Show/hide back to top button
    this.showBackToTop = window.pageYOffset > 300;

    // Update current section based on scroll position
    const sections = ['hero', 'featured', 'gallery'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.currentSection = section;
          break;
        }
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    this.loading = true;
    this.filteredItems = this.items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Tous' || item.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setTimeout(() => this.loading = false, 500); // Simulate loading
  }

  toggleExpand(item: ArtworkItem) {
    item.expanded = !item.expanded;
  }

  trackByItemId(index: number, item: ArtworkItem): number {
    return item.id;
  }
}
