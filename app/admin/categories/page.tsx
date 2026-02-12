'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ICategory } from '@/models/Category'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?includeInactive=true')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setCategories(categories.filter(cat => cat._id !== id))
      } else {
        alert('Failed to delete category')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Failed to delete category')
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })
      
      if (response.ok) {
        setCategories(categories.map(cat => 
          cat._id === id ? { ...cat, isActive: !isActive } : cat
        ))
      }
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6" />
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your product categories for computers, electronics, and technology products.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href="/admin/categories/new">
            <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category._id} className="hover:bg-gray-50 transition-colors">
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex-shrink-0 h-20 w-20">
                    <img
                      className="h-20 w-20 rounded-lg object-cover border-2 border-gray-200"
                      src={category.image || '/placeholder.svg'}
                      alt={category.name}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.isActive 
                          ? 'bg-teal-100 text-teal-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Slug:</span> {category.slug}
                      </p>
                      {category.icon && (
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Icon:</span> {category.icon}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(category._id!, category.isActive)}
                    className="hover:bg-gray-100"
                    title={category.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {category.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Link href={`/admin/categories/${category._id}/edit`}>
                    <Button variant="outline" size="sm" className="hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300" title="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category._id!)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
          <div className="mx-auto w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-12 h-12 text-teal-600" />
          </div>
          <p className="text-gray-500 text-lg mb-2">No categories found</p>
          <p className="text-gray-400 text-sm mb-6">Get started by creating your first technology category</p>
          <Link href="/admin/categories/new">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create your first category
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}