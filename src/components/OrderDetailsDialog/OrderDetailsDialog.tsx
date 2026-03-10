"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { memo } from "react";
import { NovaPostLogo } from "@/components/common/NovaPostLogo/NovaPostLogo";
import { useOrder } from "@/entities/orders/queries";
import { formatDate } from "@/utils/date";
import { ImagePreview } from "./ImagePreview";
import "./OrderDetailsDialog.css";

interface OrderDetailsDialogProps {
  orderId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMouseMove: () => void;
}

export const OrderDetailsDialog = memo(
  ({ orderId, open, onOpenChange, onMouseMove }: OrderDetailsDialogProps) => {
    const { data: order, isLoading } = useOrder(orderId);

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content" onMouseMove={onMouseMove}>
            <Dialog.Title className="dialog-title">
              Замовлення #{orderId}
            </Dialog.Title>

            {isLoading && <div className="dialog-loading">Завантаження...</div>}

            {order && (
              <div className="dialog-body">
                <div className="dialog-body-container">
                  {/* Attachments Section */}
                  {order.attachments && order.attachments.length > 0 && (
                    <section className="dialog-section">
                      <h3 className="dialog-section-title">Файли</h3>
                      <div className="dialog-attachments">
                        {order.attachments.map((attachment, index) => (
                          <ImagePreview
                            key={index}
                            src={attachment}
                            alt={`Вкладення ${index + 1}`}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="dialog-section">
                    {order.shipping_date && (
                      <div className="dialog-info-item">
                        <span className="dialog-label">Дата відправки</span>
                        <span className="dialog-value">
                          {formatDate(order.shipping_date)}
                        </span>
                      </div>
                    )}

                    <div className="dialog-info-item">
                      <span className="dialog-label">Джерело</span>
                      <span className="dialog-value">{order.source_name}</span>
                    </div>

                    {order.tracking_code && (
                      <div className="dialog-info-item dialog-tracking">
                        <span className="dialog-label">
                          <NovaPostLogo width={20} />
                          ТТН
                        </span>
                        <span className="dialog-value dialog-tracking-code">
                          {order.tracking_code}
                        </span>
                      </div>
                    )}

                    {/* Custom Fields Section */}
                    {order.custom_fields && order.custom_fields.length > 0 && (
                      <section className="dialog-section">
                        <h3 className="dialog-section-title">
                          Додаткова інформація
                        </h3>
                        <div className="dialog-custom-fields">
                          {order.custom_fields.map((field, index) => (
                            <div key={index} className="dialog-custom-field">
                              <span className="dialog-label">{field.name}</span>
                              <span className="dialog-value dialog-custom-field-value">
                                {field.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>

                {/* Products Section */}
                {order.products && order.products.length > 0 && (
                  <section className="dialog-section">
                    <h3 className="dialog-section-title">Товари</h3>
                    <div className="dialog-products-table-wrapper">
                      <table className="dialog-products-table">
                        <thead>
                          <tr>
                            <th>№</th>
                            <th>Зображення</th>
                            <th>Назва товару</th>
                            <th>Шт.</th>
                            <th>Коментар</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product, index) => (
                            <tr key={product.id}>
                              <td className="dialog-table-num">{index + 1}</td>
                              <td className="dialog-table-image">
                                {product.thumbnail && (
                                  <ImagePreview
                                    src={product.thumbnail}
                                    alt={product.name}
                                  />
                                )}
                              </td>
                              <td className="dialog-table-name">
                                <span className="dialog-product-name">
                                  {product.name}
                                </span>
                                {product.properties &&
                                  product.properties.length > 0 && (
                                    <div className="dialog-product-properties">
                                      {product.properties.map((prop, idx) => (
                                        <div
                                          key={idx}
                                          className="dialog-product-property"
                                        >
                                          <span className="dialog-property-name">
                                            {prop.name}:
                                          </span>
                                          <span className="dialog-property-value">
                                            {prop.value}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                              </td>
                              <td className="dialog-table-qty">
                                {product.quantity}
                              </td>
                              <td className="dialog-table-comment">
                                {product.comment || "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}
              </div>
            )}

            <Dialog.Close asChild>
              <button
                className="dialog-close"
                aria-label="Закрити"
                type={"button"}
              >
                ✕
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

OrderDetailsDialog.displayName = "OrderDetailsDialog";
