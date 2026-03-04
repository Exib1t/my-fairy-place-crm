"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { memo } from "react";
import { NovaPostLogo } from "@/components/common/NovaPostLogo/NovaPostLogo";
import type { KeyCrmOrder } from "@/entities/orders/models";
import { useOrder } from "@/entities/orders/queries";
import { formatDate, isOverdue } from "@/utils/date";
import { ImagePreview } from "./ImagePreview";
import "./OrderDetailsDialog.css";
import { ORDER_STATUS } from "@/utils/constants";

interface OrderDetailsDialogProps {
  orderId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsDialog = memo(
  ({ orderId, open, onOpenChange }: OrderDetailsDialogProps) => {
    const { data: order, isLoading } = useOrder(orderId);

    const isOverdueStatus = isOverdue(order?.shipping_date ?? "");
    const isNewOrder = order?.status === ORDER_STATUS.NEW;
    const isManufacturedOrder = order?.status === ORDER_STATUS.MANUFACTURED;

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">
              Заказ #{orderId}
            </Dialog.Title>

            {isLoading && <div className="dialog-loading">Загрузка...</div>}

            {order && (
              <div className="dialog-body">
                {/* Main Info Section */}
                <section className="dialog-section">
                  <div className="dialog-info-grid">
                    <div className="dialog-info-item">
                      <span className="dialog-label">Статус</span>
                      <span
                        className={`dialog-value dialog-status ${isOverdueStatus ? "-overdue" : ""} ${isNewOrder ? "-new" : ""} ${isManufacturedOrder ? "-manufactured" : ""}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="dialog-info-item">
                      <span className="dialog-label">Источник</span>
                      <span className="dialog-value">{order.source_name}</span>
                    </div>

                    {order.shipping_date && (
                      <div className="dialog-info-item">
                        <span className="dialog-label">Дата отправки</span>
                        <span className="dialog-value">
                          {formatDate(order.shipping_date)}
                        </span>
                      </div>
                    )}

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
                  </div>
                </section>

                {/* Custom Fields Section */}
                {order.custom_fields && order.custom_fields.length > 0 && (
                  <section className="dialog-section">
                    <h3 className="dialog-section-title">
                      Дополнительная информация
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

                {/* Attachments Section */}
                {order.attachments && order.attachments.length > 0 && (
                  <section className="dialog-section">
                    <h3 className="dialog-section-title">Файли</h3>
                    <div className="dialog-attachments">
                      {order.attachments.map((attachment, index) => (
                        <ImagePreview
                          key={index}
                          src={attachment}
                          alt={`Вложение ${index + 1}`}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Products Section */}
                {order.products && order.products.length > 0 && (
                  <section className="dialog-section">
                    <h3 className="dialog-section-title">Товары</h3>
                    <div className="dialog-products">
                      {order.products.map((product) => (
                        <div key={product.id} className="dialog-product">
                          {product.thumbnail && (
                            <ImagePreview
                              src={product.thumbnail}
                              alt={product.name}
                            />
                          )}
                          <div className="dialog-product-info">
                            <div className="dialog-product-name">
                              {product.name}
                            </div>
                            <div className="dialog-product-quantity">
                              Количество: {product.quantity}
                            </div>
                            {product.comment && (
                              <div className="dialog-product-comment">
                                {product.comment}
                              </div>
                            )}
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            <Dialog.Close asChild>
              <button className="dialog-close" aria-label="Закрыть">
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
