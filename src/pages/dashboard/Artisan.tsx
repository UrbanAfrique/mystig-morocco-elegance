import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Palette, Star, MapPin, Package } from 'lucide-react';
import { useState } from 'react';

const Artisan = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    artisan: '',
    location: '',
    price: '',
    stock: '',
    description: '',
    materials: '',
    dimensions: ''
  });

  const products = [
    {
      id: 1,
      name: 'Tapis Berbère Authentique',
      category: 'Textile',
      artisan: 'Fatima Amellal',
      location: 'Azilal, Atlas',
      price: '2,500 MAD',
      stock: 5,
      sold: 12,
      rating: 4.9,
      status: 'active',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Tapis tissé à la main selon les traditions berbères',
      materials: 'Laine pure, teintures naturelles',
      dimensions: '200x150 cm'
    },
    {
      id: 2,
      name: 'Poterie Traditionnelle Safi',
      category: 'Céramique',
      artisan: 'Mohammed Tazi',
      location: 'Safi',
      price: '450 MAD',
      stock: 15,
      sold: 28,
      rating: 4.7,
      status: 'active',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Vase en céramique peint à la main',
      materials: 'Argile de Safi, émaux traditionnels',
      dimensions: '30x20 cm'
    },
    {
      id: 3,
      name: 'Bijoux Argent Tiznit',
      category: 'Bijouterie',
      artisan: 'Aicha Ouali',
      location: 'Tiznit',
      price: '800 MAD',
      stock: 8,
      sold: 15,
      rating: 4.8,
      status: 'active',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Collier en argent massif avec motifs berbères',
      materials: 'Argent 925, pierres semi-précieuses',
      dimensions: '45 cm de longueur'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'textile': return 'bg-blue-100 text-blue-800';
      case 'céramique': return 'bg-orange-100 text-orange-800';
      case 'bijouterie': return 'bg-purple-100 text-purple-800';
      case 'maroquinerie': return 'bg-green-100 text-green-800';
      case 'bois': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      name: '',
      category: '',
      artisan: '',
      location: '',
      price: '',
      stock: '',
      description: '',
      materials: '',
      dimensions: ''
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      artisan: item.artisan,
      location: item.location,
      price: item.price.replace(' MAD', ''),
      stock: item.stock.toString(),
      description: item.description,
      materials: item.materials,
      dimensions: item.dimensions
    });
    setShowForm(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Artisanat Marocain
            </h1>
            <p className="text-muted-foreground">
              Gérez votre collection d'artisanat traditionnel marocain
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un produit</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <p className="text-muted-foreground text-sm">Produits actifs</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">28</h3>
            <p className="text-muted-foreground text-sm">Stock total</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">55</h3>
            <p className="text-muted-foreground text-sm">Ventes totales</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">4.8</h3>
            <p className="text-muted-foreground text-sm">Note moyenne</p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingItem ? 'Modifier le produit' : 'Ajouter un produit artisanal'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom du produit</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <option value="Textile">Textile</option>
                      <option value="Céramique">Céramique</option>
                      <option value="Bijouterie">Bijouterie</option>
                      <option value="Maroquinerie">Maroquinerie</option>
                      <option value="Bois">Bois</option>
                      <option value="Métal">Métal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom de l'artisan</label>
                    <input
                      type="text"
                      value={formData.artisan}
                      onChange={(e) => setFormData({...formData, artisan: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Lieu de fabrication</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Prix (MAD)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Stock disponible</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Matériaux utilisés</label>
                    <textarea
                      value={formData.materials}
                      onChange={(e) => setFormData({...formData, materials: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={2}
                      placeholder="Laine, argent, bois de cèdre..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="ex: 30x20 cm"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({
                        name: '',
                        category: '',
                        artisan: '',
                        location: '',
                        price: '',
                        stock: '',
                        description: '',
                        materials: '',
                        dimensions: ''
                      });
                    }}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
                  >
                    {editingItem ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                  {product.category}
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
                  Stock: {product.stock}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-1">Par {product.artisan}</p>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {product.location}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3">{product.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Matériaux:</strong> {product.materials}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Dimensions:</strong> {product.dimensions}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Package className="w-4 h-4 mr-1" />
                    {product.sold} vendus
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.stock > 5 ? 'bg-green-100 text-green-800' : 
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-red-600 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Artisan;